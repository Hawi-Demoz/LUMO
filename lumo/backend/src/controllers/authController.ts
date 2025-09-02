import { Request, Response } from "express";
import { User } from "../models/User";
import mongoose from "mongoose";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

// Fallback in-memory user store for when MongoDB is not available
const fallbackUsers = new Map();

// Get Session model after ensuring it's registered
const getSessionModel = () => {
  try {
    return mongoose.model("Session");
  } catch {
    // If model doesn't exist, import and register it
    const { Session } = require("../models/Session");
    return Session;
  }
};

// Check if MongoDB is available
const isMongoAvailable = () => {
  return mongoose.connection.readyState === 1;
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required." });
    }

    // Check if user exists
    let existingUser = null;
    if (isMongoAvailable()) {
      existingUser = await User.findOne({ email });
    } else {
      existingUser = fallbackUsers.get(email);
    }

    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    if (isMongoAvailable()) {
      // Create user in MongoDB
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      
      return res.status(201).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        message: "User registered successfully.",
      });
    } else {
      // Create user in fallback store
      const userId = Date.now().toString();
      const user = { _id: userId, name, email, password: hashedPassword };
      fallbackUsers.set(email, user);
      
      return res.status(201).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        message: "User registered successfully (fallback mode).",
      });
    }
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ 
      message: "Server error", 
      error: error instanceof Error ? error.message : "Unknown error" 
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Find user
    let user = null;
    if (isMongoAvailable()) {
      user = await User.findOne({ email });
    } else {
      user = fallbackUsers.get(email);
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env['JWT_SECRET'] || "your-secret-key",
      { expiresIn: "24h" }
    );

    // Create session (only if MongoDB is available)
    if (isMongoAvailable()) {
      try {
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);

        const Session = getSessionModel();
        const session = new Session({
          userId: user._id,
          token,
          expiresAt,
          deviceInfo: req.headers["user-agent"],
        });
        await session.save();
      } catch (sessionError) {
        console.warn("Session creation failed:", sessionError);
        // Continue without session for now
      }
    }

    // Respond with user data and token
    return res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ 
      message: "Server error", 
      error: error instanceof Error ? error.message : "Unknown error" 
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token && isMongoAvailable()) {
      try {
        const Session = getSessionModel();
        await Session.deleteOne({ token });
      } catch (sessionError) {
        console.warn("Session deletion failed:", sessionError);
      }
    }
    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ 
      message: "Server error", 
      error: error instanceof Error ? error.message : "Unknown error" 
    });
  }
};