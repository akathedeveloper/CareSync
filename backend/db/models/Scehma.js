
import mongoose from "mongoose";
// user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["patient", "doctor", "admin"], default: "patient" },
  phone: String,
  dob: Date,
}, { timestamps: true });

//appointmentSchema
const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // patient
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // doctor
  date: { type: Date, required: true },
  status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" },
  notes: String,
}, { timestamps: true });


//medicationSchema
const medicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  dosage: String,
}, { timestamps: true });

//prescriptionSchema
const prescriptionSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  medications: [{
    medication: { type: mongoose.Schema.Types.ObjectId, ref: "Medication" },
    instructions: String
  }],
  issuedAt: { type: Date, default: Date.now },
}, { timestamps: true });


//notifications
const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

// Register models
 export const User = mongoose.model("User", userSchema);
 export const Appointment = mongoose.model("Appointment", appointmentSchema);
 export const Medication = mongoose.model("Medication", medicationSchema);
 export const Prescription = mongoose.model("Prescription", prescriptionSchema);
 export const Notification = mongoose.model("Notification", notificationSchema);


  

// --- Sample Dummy Data Seeder ---
export async function seedDummyData() {
  const users = await User.insertMany([
    { name: "Alice", email: "alice@example.com", passwordHash: "hashed_pw_1", role: "patient" },
    { name: "Dr. Bob", email: "bob@example.com", passwordHash: "hashed_pw_2", role: "doctor" },
  ]);

  const meds = await Medication.insertMany([
    { name: "Paracetamol", description: "Pain reliever", dosage: "500mg" },
    { name: "Amoxicillin", description: "Antibiotic", dosage: "250mg" }
  ]);

  const appointment = await Appointment.create({
    user: users[0]._id,
    doctor: users[1]._id,
    date: new Date(),
    status: "scheduled",
    notes: "General check-up"
  });

  const prescription = await Prescription.create({
    patient: users[0]._id,
    doctor: users[1]._id,
    medications: [
      { medication: meds[0]._id, instructions: "Take after meals" }
    ]
  });

  await Notification.create({
    user: users[0]._id,
    message: "Your appointment with Dr. Bob is scheduled."
  });

  console.log(" Dummy data seeded");
}
