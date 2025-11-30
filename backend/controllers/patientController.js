import { Patient } from "../db/models/Patient.js";
import { User } from "../db/models/User.js";

export const createPatient = async (req, res, next) => {
  try {
    const { name, email, age, gender, phone, notes } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "name and email are required" });
    }

    // Ensure a user document exists for the patient email, or create a minimal one
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, role: "patient", password: "Temp#1234" });
    }

    const patient = await Patient.create({
      user: user._id,
      age,
      gender,
      phone,
      address: notes || "",
    });

    return res.status(201).json({
      message: "Patient created",
      patientId: patient._id,
    });
  } catch (err) {
    next(err);
  }
};


