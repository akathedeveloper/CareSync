// src/components/pharmacist/PharmacistDashboard.jsx
import React, { useState } from 'react';
import { 
  ClipboardDocumentListIcon, 
  CheckCircleIcon, 
  ClockIcon,
  TruckIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const PharmacistDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { name: "Pending Orders", value: "12", icon: ClockIcon, color: "text-yellow-600 dark:text-yellow-400", bgColor: "bg-yellow-100 dark:bg-yellow-900/30" },
    { name: "Completed Today", value: "28", icon: CheckCircleIcon, color: "text-green-600 dark:text-green-400", bgColor: "bg-green-100 dark:bg-green-900/30" },
    { name: "Total Prescriptions", value: "156", icon: ClipboardDocumentListIcon, color: "text-blue-600 dark:text-blue-400", bgColor: "bg-blue-100 dark:bg-blue-900/30" },
    { name: "Out for Delivery", value: "8", icon: TruckIcon, color: "text-purple-600 dark:text-purple-400", bgColor: "bg-purple-100 dark:bg-purple-900/30" },
  ];

  const pendingOrders = [
    { id: "RX001", patient: "John Doe", doctor: "Dr. Smith", medicines: ["Metformin 500mg", "Lisinopril 10mg"], priority: "high", submittedAt: "2 hours ago" },
    { id: "RX002", patient: "Sarah Wilson", doctor: "Dr. Johnson", medicines: ["Vitamin D3", "Calcium tablets"], priority: "normal", submittedAt: "4 hours ago" },
    { id: "RX003", patient: "Michael Brown", doctor: "Dr. Davis", medicines: ["Ibuprofen 400mg"], priority: "low", submittedAt: "6 hours ago" },
    { id: "RX004", patient: "Emily Johnson", doctor: "Dr. Wilson", medicines: ["Omeprazole 20mg", "Vitamin B12"], priority: "normal", submittedAt: "8 hours ago" },
  ];

  const filteredPendingOrders = pendingOrders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-gray-100">
              Pharmacy Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
              Manage prescriptions and track inventory efficiently
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                  <p className="text-3xl font-black text-gray-900 dark:text-gray-100 mt-2">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-2xl ${stat.bgColor}`}>
                  <stat.icon className={`h-7 w-7 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pending Orders Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Pending Prescription Orders</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{filteredPendingOrders.length} orders awaiting processing</p>
              </div>
              <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-sm font-semibold">
                View All Orders
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mt-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by Patient, Doctor, or Order ID..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {filteredPendingOrders.length > 0 ? (
                filteredPendingOrders.map((order) => (
                  <div 
                    key={order.id} 
                    className="border border-gray-200 dark:border-gray-600 rounded-xl p-6 hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors bg-gray-50 dark:bg-gray-700/50"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg font-medium">
                          {order.id}
                        </span>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          order.priority === 'high' 
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                          order.priority === 'normal' 
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                            'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                        }`}>
                          {order.priority.toUpperCase()} PRIORITY
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{order.submittedAt}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Patient</p>
                        <p className="text-gray-900 dark:text-gray-100 font-medium">{order.patient}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Prescribed by</p>
                        <p className="text-gray-900 dark:text-gray-100 font-medium">{order.doctor}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Items</p>
                        <p className="text-gray-900 dark:text-gray-100 font-medium">{order.medicines.length} medicines</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Prescribed Medicines:</p>
                      <div className="flex flex-wrap gap-2">
                        {order.medicines.map((medicine, index) => (
                          <span
                            key={index}
                            className="inline-block bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-3 py-2 rounded-lg text-sm font-medium"
                          >
                            {medicine}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-3">
                      <button className="px-6 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium">
                        Review Details
                      </button>
                      <button className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold">
                        Process Order
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <ClipboardDocumentListIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium">No pending orders found.</p>
                  <p className="text-sm">Try adjusting your search criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacistDashboard;
