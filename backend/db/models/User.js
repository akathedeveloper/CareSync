import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["patient", "doctor", "pharmacist"],
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
