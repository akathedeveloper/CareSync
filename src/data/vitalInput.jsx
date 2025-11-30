import React from "react";
import { evaluate } from "mathjs";

const ranges = {
  "Blood Pressure": { min: 60, max: 180 },
  "Heart Rate": { min: 40, max: 180 },
  "Temperature": { min: 95, max: 105 }
};

export function VitalInput({ vitalType, form, setForm }) {
  const range = ranges[vitalType];

  // Safely evaluate the input
  const value = (() => {
    try {
      return form.value ? evaluate(form.value) : NaN;
    } catch {
      return NaN;
    }
  })();

  // Check if the value is out of the expected range
  const outOfRange =
    range && !isNaN(value) && (value < range.min || value > range.max);

  return (
    <div className="grid grid-cols-1 gap-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {vitalType} Value
      </label>
      <input
        type="text"
        value={form.value}
        onChange={(e) => {
          // Allow digits, arithmetic operators, and decimal point
          if (/^[0-9+\-*/%.]*$/.test(e.target.value)) {
            setForm((f) => ({ ...f, value: e.target.value }));
          }
        }}
        placeholder="Enter value"
        className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
      <p className="text-gray-500 text-sm">
        Expected: {range.min} - {range.max}
      </p>
      {outOfRange && (
        <p className="text-red-500 text-sm">
          Value for {vitalType} seems unusual. Please verify.
        </p>
      )}
    </div>
  );
}
