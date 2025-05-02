// routes/auth_route.js
const express = require("express");
const router = express.Router();
const Auth = require("../models/Auth");
const bcrypt = require("bcrypt");

// Register route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await Auth.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const auth = await Auth.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully", auth });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const auth = await Auth.findOne({ email });
    if (!auth) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, auth.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", auth });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
