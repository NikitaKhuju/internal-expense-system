// controllers/user.controller.js
import User from "../models/User.js";

export const createStaff = async (req, res) => {
  const { name, email, password, department } = req.body; // ❌ phone removed

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    department,
    role: "staff",
  });

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    department: user.department,
    createdAt: user.createdAt,
  });
};
