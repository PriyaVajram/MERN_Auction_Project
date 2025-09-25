import express from "express";
import {
  register,
  login,
  logout,
  getProfile,
  fetchLeaderboard
} from "../controllers/userController.js";

import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

// TEST ROUTE
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "User route is live and working!",
    timestamp: new Date(),
  });
});

// Existing routes
router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getProfile);
router.get("/logout", isAuthenticated, logout);
router.get("/leaderboard", isAuthenticated, isAuthorized("Admin", "Auctioneer"), fetchLeaderboard);

export default router;
