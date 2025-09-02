import React, { useState } from "react";
import html2pdf from "html2pdf.js";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import RatingFeedback from "../common/RatingFeedback";

const prescriptionsData = [
  {
    id: "RX001",
    doctor: "Dr. Sarah Johnson",
    date: "2024-01-15",
    status: "active",
    medicines: [
      {
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        duration: "30 days",
      },
      {
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "30 days",
      },
    ],
    instructions: "Take with meals. Monitor blood sugar levels regularly.",
    nextRefill: "2024-02-14",
  },
  {
    id: "RX002",
    doctor: "Dr. Michael Brown",
    date: "2024-01-10",
    status: "completed",
    medicines: [
      {
        name: "Amoxicillin",
        dosage: "500mg",
        frequency: "Three times daily",
        duration: "7 days",
      },
    ],
    instructions: "Complete the full course even if symptoms improve.",
    nextRefill: null,
  },
  {
    id: "RX003",
    doctor: "Dr. Sarah Johnson",
    date: "2024-01-05",
    status: "expired",
    medicines: [
      {
        name: "Vitamin D3",
        dosage: "1000 IU",
        frequency: "Once daily",
        duration: "90 days",
      },
    ],
    instructions: "Take with fat-containing meal for better absorption.",
    nextRefill: "2024-04-05",
  },
];

const statusBadge = {
  active:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  completed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  expired: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
};

export default function Prescriptions() {
  const [selected, setSelected] = useState(null);

  const exportToPDF = () => {
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="color: #2563eb; text-align: center; margin-bottom: 30px;">My Prescriptions</h1>
        <p style="text-align: center; margin-bottom: 20px;">Generated on ${new Date().toLocaleDateString()}</p>
        ${prescriptionsData.map(presc => `
          <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin-bottom: 10px;">Prescription ID: ${presc.id}</h2>
            <p><strong>Doctor:</strong> ${presc.doctor}</p>
            <p><strong>Date:</strong> ${presc.date}</p>
            <p><strong>Status:</strong> ${presc.status.charAt(0).toUpperCase() + presc.status.slice(1)}</p>
            <div style="margin: 15px 0;">
              <strong>Medicines:</strong>
              <ul style="margin: 5px 0; padding-left: 20px;">
                ${presc.medicines.map(med => `
                  <li>${med.name} — ${med.dosage}, ${med.frequency} (${med.duration})</li>
                `).join('')}
              </ul>
            </div>
            <p><strong>Instructions:</strong> ${presc.instructions}</p>
            <p><strong>Next Refill:</strong> ${presc.nextRefill || 'N/A'}</p>
          </div>
        `).join('')}
      </div>
    `;

    const options = {
      margin: 1,
      filename: 'my-prescriptions.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="p-2 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
          Prescriptions
        </h2>
        <button
          onClick={exportToPDF}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition dark:bg-emerald-500 dark:hover:bg-emerald-600"
        >
          <DocumentArrowDownIcon className="h-5 w-5" />
          Export All to PDF
        </button>
      </div>
      {/* Responsive grid of cards/boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {prescriptionsData.map((presc) => (
          <div
            key={presc.id}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex flex-col justify-between h-full border border-gray-200 dark:border-gray-700"
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-base text-gray-900 dark:text-gray-100">
                  {presc.id}
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    statusBadge[presc.status]
                  }`}
                >
                  {presc.status.charAt(0).toUpperCase() + presc.status.slice(1)}
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span className="font-semibold">Doctor:</span> {presc.doctor}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span className="font-semibold">Date:</span> {presc.date}
              </div>
              <div className="text-sm mb-1 text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Medicines:</span>
                <ul className="list-disc pl-5">
                  {presc.medicines.map((med, i) => (
                    <li key={i}>
                      {med.name} ({med.dosage})
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span className="font-semibold">Next Refill:</span>{" "}
                {presc.nextRefill || (
                  <span className="text-gray-400 dark:text-gray-500 italic">
                    -
                  </span>
                )}
              </div>
            </div>
            <button
              className="mt-3 px-4 py-2 bg-primary-600 text-white font-semibold rounded shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 transition dark:bg-primary-500 dark:hover:bg-primary-600"
              onClick={() => setSelected(presc)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Responsive Details Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 w-full sm:w-auto sm:min-w-[340px] max-w-lg m-2 sm:m-0 rounded-lg shadow-lg p-4 sm:p-6 relative border border-gray-200 dark:border-gray-700">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 text-2xl"
              onClick={() => setSelected(null)}
              aria-label="Close prescription details"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
              Prescription ID: {selected.id}
            </h3>
            <p className="mb-1 text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Doctor:</span> {selected.doctor}
            </p>
            <p className="mb-1 text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Date:</span> {selected.date}
            </p>
            <p className="mb-1 text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Status:</span>
              <span
                className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
                  statusBadge[selected.status]
                }`}
              >
                {selected.status.charAt(0).toUpperCase() +
                  selected.status.slice(1)}
              </span>
            </p>
            <div className="mt-2 text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Medicines:</span>
              <ul className="list-disc pl-5">
                {selected.medicines.map((med, i) => (
                  <li key={i}>
                    {med.name} — {med.dosage}, {med.frequency} ({med.duration})
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Instructions:</span>{" "}
              {selected.instructions}
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Next Refill:</span>{" "}
              {selected.nextRefill || (
                <span className="text-gray-400 dark:text-gray-500 italic">
                  -
                </span>
              )}
            </p>

            {/* Rating Feedback for Pharmacist */}
            {selected.status === "completed" && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Rate Your Pharmacist
                </h4>
                <RatingFeedback
                  pharmacistId="PHARM001" // This would be dynamic in a real app
                  onSubmit={(feedback) => {
                    console.log("Pharmacist feedback submitted:", feedback);
                    // Here you could update the prescription with feedback status
                  }}
                />
              </div>
            )}

            <button
              className="mt-4 w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
