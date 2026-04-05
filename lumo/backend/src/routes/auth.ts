import { Router } from "express";
import { register, login, logout } from "../controllers/authController";
import { auth } from "../middleware/auth";

const router = Router();

// POST /auth/register
router.post("/register", register);

// POST /auth/login
router.post("/login", login);

// POST /auth/logout
router.post("/logout", auth, logout);

// GET /auth/me
router.get("/me", auth, (req, res) => {
  const safeUser = {
    _id: req.user?._id,
    name: req.user?.name,
    email: req.user?.email,
  };

  res.json({ user: safeUser });
});

export default router;