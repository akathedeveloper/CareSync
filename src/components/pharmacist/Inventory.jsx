import React, { useState } from 'react';
import { MagnifyingGlassIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

const UpdateStockModal = ({ onClose, onSave, item }) => {
    const [newStock, setNewStock] = useState(item.stock);
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity duration-300">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl max-w-sm w-full transform scale-95 transition-transform duration-300">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Update Stock for {item.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Current Stock: {item.stock}</p>
          <div className="mb-6">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Stock Quantity</label>
            <input
              type="number"
              id="stock"
              className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(item.id, parseInt(newStock))}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
};

UpdateStockModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
};

const Inventory = () => {
    const [inventoryData, setInventoryData] = useState([
      { id: 1, name: 'Metformin 500mg', stock: 150, unit: 'tablets', expiry: '2026-03-15' },
      { id: 2, name: 'Lisinopril 10mg', stock: 25, unit: 'tablets', expiry: '2025-08-20' },
      { id: 3, name: 'Vitamin D3', stock: 300, unit: 'capsules', expiry: '2027-01-10' },
      { id: 4, name: 'Ibuprofen 400mg', stock: 15, unit: 'tablets', expiry: '2025-09-01' },
      { id: 5, name: 'Amoxicillin 250mg', stock: 100, unit: 'capsules', expiry: '2026-11-25' },
    ]);
    
    const [searchQuery, setSearchQuery] = useState('');
    
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedItemToUpdate, setSelectedItemToUpdate] = useState(null);
  
    const handleUpdateStock = (id, newStock) => {
      setInventoryData(inventoryData.map(item =>
        item.id === id ? { ...item, stock: newStock } : item
      ));
      setIsUpdateModalOpen(false);
    };
    
    const openUpdateModal = (item) => {
      setSelectedItemToUpdate(item);
      setIsUpdateModalOpen(true);
    };
    
    const filteredInventory = inventoryData.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const lowStockThreshold = 50;
  
    return (
      <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen font-sans antialiased">
        <div className="flex justify-between items-center mb-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Medicine Inventory</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">View and manage all medicine stock.</p>
            </div>
            
        </div>

        <div className="relative mt-6 mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 dark:text-gray-300" />
          </div>
          <input
            type="text"
            placeholder="Search medicines..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
  
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="max-h-[70vh] overflow-y-auto pr-2">
            <ul className="space-y-4">
              {filteredInventory.length > 0 ? (
                filteredInventory.map((item) => (
                  <li key={item.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{item.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                          Stock: {item.stock} {item.unit}
                          {item.stock <= lowStockThreshold && (
                              <span className="ml-2 inline-flex items-center text-red-500 font-medium">
                                  <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                                  Low
                              </span>
                          )}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Expiry: {item.expiry}</p>
                    </div>
                    <button 
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={() => openUpdateModal(item)}
                    >
                      Update
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-center py-10 text-gray-500 dark:text-gray-400">No medicines found.</li>
              )}
            </ul>
          </div>
        </div>
        
        {isUpdateModalOpen && selectedItemToUpdate && (
          <UpdateStockModal
            onClose={() => setIsUpdateModalOpen(false)}
            onSave={handleUpdateStock}
            item={selectedItemToUpdate}
          />
        )}
      </div>
    );
};

Inventory.propTypes = {
};

export default Inventory;