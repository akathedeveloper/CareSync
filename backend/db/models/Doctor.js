// models/Doctor.js

import mongoose from "mongoose";

// Appointment Schema
const doctorAppointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
      default: "pending",
    },
    reason: { type: String }, // e.g. "General Checkup"
    notes: { type: String },
  },
  { timestamps: true }
);

// Schedule Schema (Doctor's working hours)
const doctorScheduleSchema = new mongoose.Schema(
  {
    day: { 
      type: String, 
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], 
      required: true 
    },
    startTime: { type: String, required: true }, // e.g. "09:00"
    endTime: { type: String, required: true },   // e.g. "17:00"
    isAvailable: { type: Boolean, default: true },
  },
  { _id: false }
);

const doctorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Link to User table

    phone: { type: String },
     
    specialization: { type: String, required: true }, // e.g. "Cardiologist"
    
    LicenseNumber:{type:Number},
    experience:{type:Number},

    // Dashboard Data
    appointments: [doctorAppointmentSchema],

    // Patients handled by this doctor
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],

    // Doctor's working schedule
    schedule: [doctorScheduleSchema],
  },
  { timestamps: true }
);

export const Doctor =  mongoose.model("Doctor", doctorSchema);
