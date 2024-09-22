export type UserRole = "user" | "company" | "driver" | "admin";

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const STORAGE_KEY = "auth_user";

// Determine role based on email pattern
function getRoleFromEmail(email: string): UserRole {
  const emailLower = email.toLowerCase();
  if (emailLower.startsWith("admin@")) return "admin";
  if (emailLower.startsWith("company@")) return "company";
  if (emailLower.startsWith("driver@")) return "driver";
  return "user";
}

export async function signup(
  email: string,
  password: string,
  fullName: string,
  role: UserRole
): Promise<User> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Check if user already exists
  const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
  if (existingUsers.some((u: any) => u.email === email)) {
    throw new Error("Email already registered");
  }

  // Create new user
  const user: User = {
    id: Math.random().toString(36).substr(2, 9),
    email,
    fullName,
    role,
  };

  // Store user with password (in real app, password would be hashed on backend)
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push({ ...user, password });
  localStorage.setItem("users", JSON.stringify(users));

  // Set as current user
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

  return user;
}

export async function signin(email: string, password: string): Promise<User> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u: any) => u.email === email);

  if (!user || user.password !== password) {
    throw new Error("Invalid email or password");
  }

  const authenticatedUser: User = {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser));
  return authenticatedUser;
}

export function getCurrentUser(): User | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}
