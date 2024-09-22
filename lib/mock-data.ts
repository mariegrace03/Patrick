// Mock data service for frontend-only waste management system

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: "user" | "company" | "driver" | "admin";
  phone?: string;
  address?: string;
}

export interface CollectionSchedule {
  id: string;
  date: string;
  time: string;
  wasteType: string;
  status: "scheduled" | "completed" | "missed";
  address: string;
  driverId?: string;
  driverName?: string;
}

export interface Payment {
  id: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "overdue";
  description: string;
  method?: string;
}

export interface Complaint {
  id: string;
  title: string;
  issueType: string;
  description: string;
  status: "Pending" | "In Progress" | "Resolved";
  date: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "warning" | "success";
}

export interface Household {
  id: string;
  address: string;
  wasteType: string;
  binSize: string;
  collectionFrequency: string;
  status: "active" | "inactive";
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  status: "active" | "inactive";
  completedTrips: number;
  rating: number;
}

export interface CompanyStats {
  totalFleet: number;
  activeDrivers: number;
  completedPickups: number;
  pendingPickups: number;
  totalRevenue: number;
  averageRating: number;
}

// Mock data storage
const STORAGE_PREFIX = "waste_mgmt_";

// Initialize mock data
function initializeMockData() {
  const key = `${STORAGE_PREFIX}initialized`;
  if (localStorage.getItem(key)) return;

  // Mock schedules
  const schedules: CollectionSchedule[] = [
    {
      id: "1",
      date: "2024-01-15",
      time: "08:00 AM",
      wasteType: "General Waste",
      status: "scheduled",
      address: "123 Kigali Street, Kicukiro",
      driverId: "d1",
      driverName: "John Doe",
    },
    {
      id: "2",
      date: "2024-01-22",
      time: "08:00 AM",
      wasteType: "Recyclables",
      status: "scheduled",
      address: "123 Kigali Street, Kicukiro",
      driverId: "d2",
      driverName: "Jane Smith",
    },
    {
      id: "3",
      date: "2024-01-10",
      time: "08:30 AM",
      wasteType: "Organic Waste",
      status: "completed",
      address: "456 Nyamirambo Ave",
      driverId: "d1",
      driverName: "John Doe",
    },
  ];

  // Mock payments
  const payments: Payment[] = [
    {
      id: "1",
      amount: 25.0,
      date: "2024-01-01",
      status: "pending",
      description: "Monthly waste collection fee",
      method: "Mobile Money",
    },
    {
      id: "2",
      amount: 25.0,
      date: "2023-12-01",
      status: "paid",
      description: "Monthly waste collection fee",
      method: "Bank Transfer",
    },
    {
      id: "3",
      amount: 25.0,
      date: "2023-11-01",
      status: "paid",
      description: "Monthly waste collection fee",
      method: "Mobile Money",
    },
  ];

  // Mock complaints
  const complaints: Complaint[] = [
    {
      id: "1",
      title: "Missed Pickup",
      issueType: "Missed Collection",
      description: "Waste collection was scheduled for today but truck did not arrive",
      status: "Pending",
      date: "Oct 8, 2025",
      priority: "High",
    },
    {
      id: "2",
      title: "Damaged Bin",
      issueType: "Equipment Issue",
      description: "My waste bin was damaged during last collection",
      status: "In Progress",
      date: "Sept 11, 2025",
      priority: "Medium",
    },
  ];

  // Mock notifications
  const notifications: Notification[] = [
    {
      id: "1",
      title: "Collection Reminder",
      message: "Your waste collection is scheduled for tomorrow at 8:00 AM",
      time: "2 hours ago",
      read: false,
      type: "info",
    },
    {
      id: "2",
      title: "Payment Due",
      message: "Your monthly payment of $25.00 is due soon",
      time: "1 day ago",
      read: false,
      type: "warning",
    },
  ];

  // Mock households
  const households: Household[] = [
    {
      id: "1",
      address: "123 Kigali Street, Kicukiro",
      wasteType: "General Waste",
      binSize: "120L",
      collectionFrequency: "Weekly",
      status: "active",
    },
  ];

  // Mock drivers
  const drivers: Driver[] = [
    {
      id: "d1",
      name: "John Doe",
      email: "driver@example.com",
      phone: "+250788123456",
      vehicle: "Toyota Hiace",
      status: "active",
      completedTrips: 45,
      rating: 4.8,
    },
    {
      id: "d2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+250788654321",
      vehicle: "Mercedes Sprinter",
      status: "active",
      completedTrips: 38,
      rating: 4.6,
    },
  ];

  localStorage.setItem(`${STORAGE_PREFIX}schedules`, JSON.stringify(schedules));
  localStorage.setItem(`${STORAGE_PREFIX}payments`, JSON.stringify(payments));
  localStorage.setItem(`${STORAGE_PREFIX}complaints`, JSON.stringify(complaints));
  localStorage.setItem(`${STORAGE_PREFIX}notifications`, JSON.stringify(notifications));
  localStorage.setItem(`${STORAGE_PREFIX}households`, JSON.stringify(households));
  localStorage.setItem(`${STORAGE_PREFIX}drivers`, JSON.stringify(drivers));
  localStorage.setItem(key, "true");
}

// Schedule functions
export function getSchedules(): CollectionSchedule[] {
  initializeMockData();
  const data = localStorage.getItem(`${STORAGE_PREFIX}schedules`);
  return data ? JSON.parse(data) : [];
}

export function addSchedule(schedule: Omit<CollectionSchedule, "id">): CollectionSchedule {
  const schedules = getSchedules();
  const newSchedule: CollectionSchedule = {
    ...schedule,
    id: Date.now().toString(),
  };
  schedules.push(newSchedule);
  localStorage.setItem(`${STORAGE_PREFIX}schedules`, JSON.stringify(schedules));
  return newSchedule;
}

export function updateSchedule(id: string, updates: Partial<CollectionSchedule>): CollectionSchedule | null {
  const schedules = getSchedules();
  const index = schedules.findIndex((s) => s.id === id);
  if (index === -1) return null;
  schedules[index] = { ...schedules[index], ...updates };
  localStorage.setItem(`${STORAGE_PREFIX}schedules`, JSON.stringify(schedules));
  return schedules[index];
}

// Payment functions
export function getPayments(): Payment[] {
  initializeMockData();
  const data = localStorage.getItem(`${STORAGE_PREFIX}payments`);
  return data ? JSON.parse(data) : [];
}

export function addPayment(payment: Omit<Payment, "id">): Payment {
  const payments = getPayments();
  const newPayment: Payment = {
    ...payment,
    id: Date.now().toString(),
  };
  payments.push(newPayment);
  localStorage.setItem(`${STORAGE_PREFIX}payments`, JSON.stringify(payments));
  return newPayment;
}

// Complaint functions
export function getComplaints(): Complaint[] {
  initializeMockData();
  const data = localStorage.getItem(`${STORAGE_PREFIX}complaints`);
  return data ? JSON.parse(data) : [];
}

export function addComplaint(complaint: Omit<Complaint, "id" | "date">): Complaint {
  const complaints = getComplaints();
  const newComplaint: Complaint = {
    ...complaint,
    id: Date.now().toString(),
    date: new Date().toLocaleDateString(),
  };
  complaints.unshift(newComplaint);
  localStorage.setItem(`${STORAGE_PREFIX}complaints`, JSON.stringify(complaints));
  return newComplaint;
}

export function updateComplaint(id: string, updates: Partial<Complaint>): Complaint | null {
  const complaints = getComplaints();
  const index = complaints.findIndex((c) => c.id === id);
  if (index === -1) return null;
  complaints[index] = { ...complaints[index], ...updates };
  localStorage.setItem(`${STORAGE_PREFIX}complaints`, JSON.stringify(complaints));
  return complaints[index];
}

// Notification functions
export function getNotifications(): Notification[] {
  initializeMockData();
  const data = localStorage.getItem(`${STORAGE_PREFIX}notifications`);
  return data ? JSON.parse(data) : [];
}

export function markNotificationAsRead(id: string): Notification | null {
  const notifications = getNotifications();
  const index = notifications.findIndex((n) => n.id === id);
  if (index === -1) return null;
  notifications[index].read = true;
  localStorage.setItem(`${STORAGE_PREFIX}notifications`, JSON.stringify(notifications));
  return notifications[index];
}

export function addNotification(notification: Omit<Notification, "id">): Notification {
  const notifications = getNotifications();
  const newNotification: Notification = {
    ...notification,
    id: Date.now().toString(),
  };
  notifications.unshift(newNotification);
  localStorage.setItem(`${STORAGE_PREFIX}notifications`, JSON.stringify(notifications));
  return newNotification;
}

// Household functions
export function getHouseholds(): Household[] {
  initializeMockData();
  const data = localStorage.getItem(`${STORAGE_PREFIX}households`);
  return data ? JSON.parse(data) : [];
}

export function addHousehold(household: Omit<Household, "id">): Household {
  const households = getHouseholds();
  const newHousehold: Household = {
    ...household,
    id: Date.now().toString(),
  };
  households.push(newHousehold);
  localStorage.setItem(`${STORAGE_PREFIX}households`, JSON.stringify(households));
  return newHousehold;
}

// Driver functions
export function getDrivers(): Driver[] {
  initializeMockData();
  const data = localStorage.getItem(`${STORAGE_PREFIX}drivers`);
  return data ? JSON.parse(data) : [];
}

export function getCompanyStats(): CompanyStats {
  const schedules = getSchedules();
  const drivers = getDrivers();
  const payments = getPayments();

  return {
    totalFleet: drivers.length,
    activeDrivers: drivers.filter((d) => d.status === "active").length,
    completedPickups: schedules.filter((s) => s.status === "completed").length,
    pendingPickups: schedules.filter((s) => s.status === "scheduled").length,
    totalRevenue: payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0),
    averageRating: drivers.length > 0 ? drivers.reduce((sum, d) => sum + d.rating, 0) / drivers.length : 0,
  };
}
