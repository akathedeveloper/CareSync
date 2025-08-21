import React, { useState } from "react";
import PropTypes from "prop-types";
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ReviewDetailsModal = ({ onClose, prescription }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-lg w-full mx-4 transform scale-95 transition-transform duration-300 max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Prescription Details</h3>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                    <div>
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Prescription ID:</p>
                        <p className="text-lg font-mono text-gray-900 dark:text-gray-100">{prescription.id}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Patient Name:</p>
                        <p className="text-lg text-gray-900 dark:text-gray-100">{prescription.patient}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Prescribed by:</p>
                        <p className="text-lg text-gray-900 dark:text-gray-100">{prescription.doctor}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Status:</p>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            prescription.status === 'pending' 
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                            : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                        }`}>
                            {prescription.status.toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Medicines:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            {prescription.medicines.map((medicine, index) => (
                                <li key={index} className="text-lg text-gray-900 dark:text-gray-100">{medicine}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Submitted At:</p>
                        <p className="text-lg text-gray-900 dark:text-gray-100">{prescription.submittedAt}</p>
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

ReviewDetailsModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    prescription: PropTypes.object.isRequired,
};

const ProcessOrderModal = ({ onClose, onProcess, prescription }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-lg w-full mx-4 transform scale-95 transition-transform duration-300 max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Process Order</h3>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                        Are you sure you want to dispense this prescription for <strong>{prescription.patient}</strong>?
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        This action will mark the order as complete and update patient records.
                    </p>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                    <button 
                        onClick={onClose} 
                        className="px-6 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => onProcess(prescription.id)} 
                        className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
                    >
                        Dispense
                    </button>
                </div>
            </div>
        </div>
    );
};

ProcessOrderModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onProcess: PropTypes.func.isRequired,
    prescription: PropTypes.object.isRequired,
};

const Prescriptions = () => {
    const [pendingPrescriptions, setPendingPrescriptions] = useState([
        {
            id: 'RX001',
            patient: 'John Doe',
            doctor: 'Dr. Smith',
            medicines: ['Metformin 500mg', 'Lisinopril 10mg'],
            priority: 'high',
            submittedAt: '2023-01-15',
            status: 'pending'
        },
        {
            id: 'RX002',
            patient: 'Sarah Wilson',
            doctor: 'Dr. Johnson',
            medicines: ['Vitamin D3', 'Calcium tablets'],
            priority: 'normal',
            submittedAt: '2023-01-14',
            status: 'pending'
        },
        {
            id: 'RX003',
            patient: 'Michael Brown',
            doctor: 'Dr. Davis',
            medicines: ['Ibuprofen 400mg'],
            priority: 'low',
            submittedAt: '2023-01-12',
            status: 'pending'
        }
    ]);

    const [completedPrescriptions, setCompletedPrescriptions] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
    const [selectedPrescription, setSelectedPrescription] = useState(null);

    const allPrescriptions = [...pendingPrescriptions, ...completedPrescriptions];

    const filteredPrescriptions = allPrescriptions.filter(prescription =>
        prescription.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prescription.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prescription.doctor.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openReviewModal = (prescription) => {
        setSelectedPrescription(prescription);
        setIsReviewModalOpen(true);
    };

    const openProcessModal = (prescription) => {
        setSelectedPrescription(prescription);
        setIsProcessModalOpen(true);
    };

    const onProcessOrder = (id) => {
        const orderToProcess = pendingPrescriptions.find(p => p.id === id);
        if (orderToProcess) {
            setPendingPrescriptions(pendingPrescriptions.filter(p => p.id !== id));
            setCompletedPrescriptions([...completedPrescriptions, { ...orderToProcess, status: 'completed' }]);
        }
        setIsProcessModalOpen(false);
        setSelectedPrescription(null);
    };

    return (
        <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen font-sans antialiased">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Prescription Management</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and track patient prescriptions.</p>

            {/* Search bar */}
            <div className="relative mt-6 mb-6">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                </div>
                <input
                    type="text"
                    placeholder="Search prescriptions..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Pending Prescriptions</h3>
                </div>
                <div className="max-h-[70vh] overflow-y-auto pr-2">
                    <ul className="space-y-4">
                        {pendingPrescriptions.length > 0 ? (
                            pendingPrescriptions.map((prescription) => (
                                <li 
                                    key={prescription.id} 
                                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                    onClick={() => openReviewModal(prescription)}
                                >
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-gray-100">{prescription.patient} - {prescription.id}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Prescribed by: {prescription.doctor}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Items: {prescription.medicines.join(', ')}</p>
                                    </div>
                                    <div className="flex space-x-2 items-center">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                            prescription.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                                            prescription.priority === 'normal' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                                            'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                                        }`}>
                                            {prescription.priority} priority
                                        </span>
                                        {prescription.status === 'pending' && (
                                            <button 
                                                onClick={(e) => { 
                                                    e.stopPropagation(); 
                                                    // Confirmation dialog added
                                                    if (window.confirm(`Are you sure you want to dispense this prescription for ${prescription.patient}?`)) {
                                                        openProcessModal(prescription); 
                                                    }
                                                }}
                                                className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium"
                                            >
                                                Process Order
                                            </button>
                                        )}
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="text-center py-10 text-gray-
