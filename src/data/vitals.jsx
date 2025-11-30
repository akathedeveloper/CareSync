import React, { useState } from "react";
import { evaluate } from "mathjs";

export const predefinedTypes = [
  { type: "Blood Pressure", unit: "mmHg" },
  { type: "Heart Rate", unit: "bpm" },
  { type: "Temperature", unit: "°C" },
  { type: "Respiratory Rate", unit: "breaths/min" },
  { type: "Other", unit: "" } // No fixed unit
];

export const vitalTypes = [
  { label: "All", value: "all" },
  { label: "Blood Pressure", value: "Blood Pressure" },
  { label: "Heart Rate", value: "Heart Rate" },
  { label: "Temperature", value: "Temperature" },
  { label: "Other", value: "other" }
];

// Define ranges for common vitals
const ranges = {
  "Blood Pressure": { min: 60, max: 180 },
  "Heart Rate": { min: 40, max: 180 },
  "Temperature": { min: 95, max: 105 },
  "Respiratory Rate": { min: 12, max: 25 }
};

export function VitalInput({ vitalType, form, setForm }) {
  const range = ranges[vitalType];

  // Safely evaluate numeric or arithmetic input
  const value = (() => {
    try {
      return form.value ? evaluate(form.value) : NaN;
    } catch {
      return NaN;
    }
  })();

  const outOfRange =
    range && !isNaN(value) && (value < range.min || value > range.max);

  // Get unit if available
  const unit = predefinedTypes.find((v) => v.type === vitalType)?.unit || "";

  return (
    <div className="grid grid-cols-1 gap-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {vitalType} Value {unit && `(${unit})`}
      </label>
      <input
        type="text"
        value={form.value}
        onChange={(e) => {
          if (/^[0-9+\-*/%.]*$/.test(e.target.value)) {
            setForm((f) => ({ ...f, value: e.target.value }));
          }
        }}
        placeholder="Enter value"
        className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
      {range && (
        <p className="text-gray-500 text-sm">
          Expected: {range.min} - {range.max} {unit}
        </p>
      )}
      {outOfRange && (
        <p className="text-red-500 text-sm">
          Value for {vitalType} seems unusual. Please verify.
        </p>
      )}
    </div>
  );
}

// Example parent component
export function VitalForm() {
  const [selectedVital, setSelectedVital] = useState("Blood Pressure");
  const [form, setForm] = useState({ value: "" });

  return (
    <div className="space-y-4">
      <select
        value={selectedVital}
        onChange={(e) => {
          setSelectedVital(e.target.value);
          setForm({ value: "" }); // Reset input on vital change
        }}
        className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      >
        {vitalTypes.map((v) => (
          <option key={v.value} value={v.value}>
            {v.label}
          </option>
        ))}
      </select>

      {selectedVital !== "all" && selectedVital !== "other" && (
        <VitalInput vitalType={selectedVital} form={form} setForm={setForm} />
      )}

      {selectedVital === "other" && (
        <input
          type="text"
          placeholder="Enter custom vital name"
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
      )}
    </div>
  );
}
