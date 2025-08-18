import React, { useState } from "react";

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
  completed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  expired: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
};

export default function Prescriptions() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-2 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Prescriptions
      </h2>
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
            <button
              className="mt-4 w-full py-2 rounded bg-emerald-600 text-white font-semibold hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors"
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
