const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const jwtSecret = process.env.JWT_SECRET || "Pratiksha'sProjecthere!";

// Create User Route
router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if the email already exists
        let existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            console.log(`User with email ${req.body.email} already exists`);
            return res.status(400).json({ success: false, errors: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        });

        console.log("User created successfully");
        res.json({ success: true });
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

// Login User Route
router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find the user by email
        let userData = await User.findOne({ email });
        if (!userData) {
            console.log(`User not found with email: ${email}`);
            return res.status(400).json({ success: false, errors: "Invalid credentials" });
        }

        // Compare the password
        const pwdCompare = await bcrypt.compare(password, userData.password);
        if (!pwdCompare) {
            console.log("Password mismatch for user:", email);
            return res.status(400).json({ success: false, errors: "Invalid credentials" });
        }

        // Create JWT token
        const data = {
            user: {
                id: userData.id
            }
        };

        const authToken = jwt.sign(data, jwtSecret, { expiresIn: '1h' });
        console.log("JWT token created for user:", email);

        return res.json({ success: true, authToken });
    } catch (error) {
        console.error("Error logging in user:", error.message);
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

module.exports = router;
