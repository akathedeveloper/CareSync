import mongoose from "mongoose";

/* ========================
   PATIENT SCHEMA
======================== */
const patientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  phone:{type:Number},
  age: { type: Number },
  gender: { type: String },
  address: { type: String },
});

/* ========================
   HEALTH LOG SUB-SCHEMA
======================== */
const healthLogSchema = new mongoose.Schema(
    {
      patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
      },
  
      type: {
        type: String,
        enum: ["vital", "symptom"], // separates vitals vs symptoms
        required: true,
      },
  
      logType: {
        type: String,
        required: true, // e.g. "Blood Pressure", "Heart Rate", "Headache", "Fatigue"
      },
  
      value: {
        type: String, // vitals: "120/80 mmHg", "88 bpm"; symptoms: could be empty
      },
  
      severity: {
        type: String,
        enum: ["mild", "moderate", "severe"],
        required: function () {
          return this.type === "symptom";
        },
      },
  
      status: {
        type: String,
        enum: ["normal", "abnormal"],
        default: "normal",
        required: function () {
          return this.type === "vital";
        },
      },
  
      notes: {
        type: String, // extra details like "After long meeting"
      },
  
      date: {
        type: Date,
        default: Date.now,
      },
    },
    { timestamps: true }
  );

/* ========================
   APPOINTMENT SUB-SCHEMA
======================== */
const appointmentSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  patientName:{ type: String,},
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
  notes:{ type: String,}
});

/* ========================
   PRESCRIPTION SUB-SCHEMA
======================== */
 
const prescriptionSchema = new mongoose.Schema({
    prescriptionId: { type: String, required: true },  
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    medications: [
      {
        name: { type: String, required: true },
        dosage: { type: String, required: true },  
      },
    ],
    status: {
      type: String,
      enum: ["active", "completed", "expired"],
      default: "active",
    },
    dateIssued: { type: Date, default: Date.now },
    nextRefill: { type: Date }, 
    notes: { type: String },  
  });
  

/* ========================
   ATTACH SUB-SCHEMAS TO PATIENT
======================== */
patientSchema.add({
  healthLogs: [healthLogSchema],
  appointments: [appointmentSchema],
  prescriptions: [prescriptionSchema],
});

export const Patient = mongoose.model("Patient", patientSchema);
