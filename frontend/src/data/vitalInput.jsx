
import React from "react";

const ranges = {
  "Blood Pressure": { min: 60, max: 180 },
  "Heart Rate": { min: 40, max: 180 },
  "Temperature": { min: 95, max: 105 }
};

export function VitalInput({ vitalType, form, setForm }) {
  const range = ranges[vitalType];
  const value = parseFloat(form.value);
  const outOfRange =
    range && !isNaN(value) && (value < range.min || value > range.max);

  return (
    <div className="grid grid-cols-1 gap-0">
       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Value
      </label>
      <input
        type="text"
        value={form.value}
        onChange={e => {
          if (/^[0-9+\-*/%.]*$/.test(e.target.value)) {
            setForm(f => ({ ...f, value: e.target.value }));
          }
        }}
        placeholder="Enter value"
        className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
      {outOfRange && (
        <p className="text-red-500 text-sm mt-1">
           Value for {vitalType} seems unusual. Please verify..
        </p>
      )}
    </div>
  );
}
