// models/Pharmacy.js

import mongoose from "mongoose";

// Prescription Order Schema
const prescriptionOrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true, required: true }, // e.g. RX001
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },

    medicines: [
      {
        name: { type: String, required: true }, // e.g. "Metformin"
        dosage: { type: String, required: true }, // e.g. "500mg"
        quantity: { type: Number, default: 1 },
      },
    ],

    priority: {
      type: String,
      enum: ["normal", "high"],
      default: "normal",
    },

    status: {
      type: String,
      enum: ["pending", "processed", "out_for_delivery", "delivered", "cancelled"],
      default: "pending",
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const pharmacySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ pharmacy login

    phone: { type: String },
    LicenseNumber:{type:Number},
    pharmarcyName:{type:String},
    address: { type: String },

    // Pharmacy prescriptions/orders
    prescriptions: [prescriptionOrderSchema],
  },
  { timestamps: true }
);

export const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);
