"use client";

import React, { useState, useEffect } from "react";
import { Calendar, MapPin, CheckCircle, Clock, Truck } from "lucide-react";
import { getSchedules, CollectionSchedule } from "@/lib/mock-data";

export default function HistoryPage() {
  const [schedules, setSchedules] = useState<CollectionSchedule[]>([]);

  useEffect(() => {
    setSchedules(getSchedules());
  }, []);

  const completedCollections = schedules.filter((s) => s.status === "completed");
  const missedCollections = schedules.filter((s) => s.status === "missed");
  const totalWeight = completedCollections.length * 15; // Mock weight calculation

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Collection History</h1>
        <p className="text-gray-600">View your past waste collections</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600" size={20} />
            <div>
              <p className="text-sm text-gray-600">Total Collections</p>
              <p className="font-semibold">{schedules.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center gap-3">
            <Truck className="text-blue-600" size={20} />
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="font-semibold">{completedCollections.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center gap-3">
            <Clock className="text-orange-600" size={20} />
            <div>
              <p className="text-sm text-gray-600">Missed</p>
              <p className="font-semibold">{missedCollections.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-gray-600 rounded" />
            <div>
              <p className="text-sm text-gray-600">Total Waste</p>
              <p className="font-semibold">{totalWeight} kg</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Collections</h2>
          <div className="space-y-4">
            {schedules.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No collection history</p>
              </div>
            ) : (
              schedules.map((schedule) => (
                <div key={schedule.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Calendar className="text-gray-500" size={20} />
                    <div>
                      <p className="font-medium">{schedule.date}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span>{schedule.address}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{schedule.time}</span>
                        </div>
                        <span>Weight: 15 kg</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      schedule.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : schedule.status === "missed"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {schedule.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
