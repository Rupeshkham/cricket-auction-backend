import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

export const registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  const adminExist = await Admin.findOne({ email });
  if (adminExist) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const admin = await Admin.create({ email, password });

  res.status(201).json({
    message: "Admin created successfully",
    admin: admin.email,
  });
};


export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin || !(await admin.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: admin._id, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    role: "admin",
  });
};
