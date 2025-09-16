import mongoose from 'mongoose'
import { User } from './models/User.js';
import { Doctor } from './models/Doctor.js';
import { Patient } from './models/Patient.js'
import { Pharmacy } from './models/Pharmacist.js'

const seedData = async () => {
  try {
    
    // ================= USERS =================
    const userPatient = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "hashedpassword123",
      role: "patient",
    });

    const userDoctor = await User.create({
      name: "Dr. Smith",
      email: "smith@example.com",
      password: "hashedpassword456",
      role: "doctor",
    });

    const userPharmacy = await User.create({
      name: "HealthPlus Pharmacy",
      email: "pharmacy@example.com",
      password: "hashedpassword789",
      role: "pharmacist",
    });

    // ================= PATIENT =================
    const patient = await Patient.create({
      user: userPatient._id,
      phone: 9876543210,
      age: 32,
      gender: "Male",
      address: "123 Main St, NY",

      healthLogs: [
        {
          patient: null, // will set later
          type: "vital",
          logType: "Heart Rate",
          value: "78 bpm",
          status: "normal",
        },
        {
          patient: null,
          type: "symptom",
          logType: "Headache",
          severity: "moderate",
          notes: "Started after work",
        },
      ],

      appointments: [
        {
          doctor: null, // will link after doctor created
          patientName: "John Doe",
          appointmentDate: new Date("2025-08-22"),
          appointmentTime: "10:30",
          status: "pending",
          notes: "Routine checkup",
        },
      ],

      prescriptions: [
        {
          prescriptionId: "RX123",
          doctor: null, // will link later
          medications: [
            { name: "Paracetamol", dosage: "500mg" },
            { name: "Vitamin D", dosage: "1000 IU" },
          ],
          status: "active",
          notes: "Take after meals",
        },
      ],
    });

    // Fix patient refs inside embedded schemas
    patient.healthLogs.forEach(log => (log.patient = patient._id));
    patient.appointments.forEach(app => (app.doctor = null));
    patient.prescriptions.forEach(p => (p.doctor = null));
    await patient.save();

    // ================= DOCTOR =================
    const doctor = await Doctor.create({
      user: userDoctor._id,
      phone: "9998887777",
      specialization: "Cardiologist",
      LicenseNumber: 123456,
      experience: 12,
      patients: [patient._id],
      appointments: [
        {
          patient: patient._id,
          date: new Date("2025-08-22"),
          reason: "General Checkup",
          status: "pending",
        },
      ],
      schedule: [
        { day: "Monday", startTime: "09:00", endTime: "17:00" },
        { day: "Wednesday", startTime: "10:00", endTime: "15:00" },
      ],
    });

    // Link doctor refs inside patient
    patient.appointments[0].doctor = doctor._id;
    patient.prescriptions[0].doctor = doctor._id;
    await patient.save();

    // ================= PHARMACY =================
    const pharmacy = await Pharmacy.create({
      user: userPharmacy._id,
      phone: "8887776666",
      LicenseNumber: 987654,
      pharmarcyName: "HealthPlus Pharmacy",
      address: "456 Market St, NY",

      prescriptions: [
        {
          orderId: "ORD001",
          patient: patient._id,
          doctor: doctor._id,
          medicines: [
            { name: "Paracetamol", dosage: "500mg", quantity: 10 },
            { name: "Vitamin D", dosage: "1000 IU", quantity: 30 },
          ],
          priority: "normal",
          status: "pending",
        },
      ],
    });

    console.log("✅ Dummy data inserted successfully");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Seed Error:", err);
    mongoose.connection.close();
  }
};

 
