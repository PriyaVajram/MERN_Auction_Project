errorMiddleware
import express from "express";

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "User route is live and working!",
    timestamp: new Date(),
  });
});

import {
  register,
  login,
  logout,
  getProfile,
  fetchLeaderboard
} from "../controllers/userController.js";

import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { errorMiddleware } from "../middlewares/error.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getProfile);
router.get("/logout", isAuthenticated, logout);
router.get("/leaderboard", isAuthenticated, isAuthorized("Admin", "Auctioneer"), fetchLeaderboard);

export default router;

