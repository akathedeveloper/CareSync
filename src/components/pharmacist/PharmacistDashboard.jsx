// src/components/pharmacist/PharmacistDashboard.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  ClipboardDocumentListIcon, 
  CheckCircleIcon, 
  ClockIcon,
  TruckIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ChartBarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const InventoryModal = ({ onClose, inventoryData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredInventory = inventoryData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
    
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 transform scale-95 transition-transform duration-300 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Medicine Inventory</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Manage your pharmacy inventory with real-time stock tracking and expiry monitoring.
        </p>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search medicines..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item) => {
                const isLowStock = item.stock < 50;
                const isExpiringSoon = new Date(item.expiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                
                return (
                  <div key={item.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{item.name}</h4>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Stock:</span>
                            <span className={`text-sm font-medium ${isLowStock ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-gray-100'}`}>
                              {item.stock} {item.unit}
                            </span>
                            {isLowStock && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                                Low Stock
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Expiry:</span>
                            <span className={`text-sm font-medium ${isExpiringSoon ? 'text-orange-600 dark:text-orange-400' : 'text-gray-900 dark:text-gray-100'}`}>
                              {item.expiry}
                            </span>
                            {isExpiringSoon && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
                                Expiring Soon
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
                        Update
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-2 text-center py-12 text-gray-500 dark:text-gray-400">
                <CubeTransparentIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>No medicines found.</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
          <button 
            onClick={onClose} 
            className="px-6 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

InventoryModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  inventoryData: PropTypes.array.isRequired,
};

const PharmacistDashboard = () => {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const inventoryData = [
    { id: 1, name: 'Metformin 500mg', stock: 150, unit: 'tablets', expiry: '2026-03-15' },
    { id: 2, name: 'Lisinopril 10mg', stock: 25, unit: 'tablets', expiry: '2025-08-20' },
    { id: 3, name: 'Vitamin D3', stock: 300, unit: 'capsules', expiry: '2027-01-10' },
    { id: 4, name: 'Ibuprofen 400mg', stock: 15, unit: 'tablets', expiry: '2025-09-01' },
    { id: 5, name: 'Amoxicillin 250mg', stock: 100, unit: 'capsules', expiry: '2026-11-25' },
    { id: 6, name: 'Acetaminophen 325mg', stock: 45, unit: 'tablets', expiry: '2025-12-10' },
    { id: 7, name: 'Losartan 50mg', stock: 80, unit: 'tablets', expiry: '2026-05-20' },
    { id: 8, name: 'Omeprazole 20mg', stock: 120, unit: 'capsules', expiry: '2026-08-15' },
  ];

  const stats = [
    {
      name: "Pending Orders",
      value: "12",
      icon: ClockIcon,
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    {
      name: "Completed Today",
      value: "28",
      icon: CheckCircleIcon,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      name: "Total Prescriptions",
      value: "156",
      icon: ClipboardDocumentListIcon,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      name: "Out for Delivery",
      value: "8",
      icon: TruckIcon,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
  ];

  const pendingOrders = [
    {
      id: "RX001",
      patient: "John Doe",
      doctor: "Dr. Smith",
      medicines: ["Metformin 500mg", "Lisinopril 10mg"],
      priority: "high",
      submittedAt: "2 hours ago",
      status: "pending"
    },
    {
      id: "RX002",
      patient: "Sarah Wilson",
      doctor: "Dr. Johnson",
      medicines: ["Vitamin D3", "Calcium tablets"],
      priority: "normal",
      submittedAt: "4 hours ago",
      status: "pending"
    },
    {
      id: "RX003",
      patient: "Michael Brown",
      doctor: "Dr. Davis",
      medicines: ["Ibuprofen 400mg"],
      priority: "low",
      submittedAt: "6 hours ago",
      status: "pending"
    },
    {
      id: "RX004",
      patient: "Emily Johnson",
      doctor: "Dr. Wilson",
      medicines: ["Omeprazole 20mg", "Vitamin B12"],
      priority: "normal",
      submittedAt: "8 hours ago",
      status: "pending"
    }
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
          <button
            onClick={() => setIsInventoryOpen(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold hover:scale-105"
          >
            <CubeTransparentIcon className="h-5 w-5" />
            <span>View Inventory</span>
          </button>
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
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.name}
                  </p>
                  <p className="text-3xl font-black text-gray-900 dark:text-gray-100 mt-2">
                    {stat.value}
                  </p>
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
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Pending Prescription Orders
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {filteredPendingOrders.length} orders awaiting processing
                </p>
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
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {order.submittedAt}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                          Patient
                        </p>
                        <p className="text-gray-900 dark:text-gray-100 font-medium">
                          {order.patient}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                          Prescribed by
                        </p>
                        <p className="text-gray-900 dark:text-gray-100 font-medium">
                          {order.doctor}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                          Items
                        </p>
                        <p className="text-gray-900 dark:text-gray-100 font-medium">
                          {order.medicines.length} medicines
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                        Prescribed Medicines:
                      </p>
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

      {/* Inventory Modal */}
      {isInventoryOpen && (
        <InventoryModal
          onClose={() => setIsInventoryOpen(false)}
          inventoryData={inventoryData}
        />
      )}
    </div>
  );
};

export default PharmacistDashboard;
