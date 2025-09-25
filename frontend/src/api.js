// src/api.js

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ===================== User Routes =====================

// Test backend
export const testBackend = async () => {
  try {
    const res = await fetch(`${backendUrl}/api/v1/user/test`);
    return await res.json();
  } catch (err) {
    console.error("API Error:", err);
  }
};

// Register user
export const registerUser = async (formData) => {
  try {
    const res = await fetch(`${backendUrl}/api/v1/user/register`, {
      method: "POST",
      body: formData, // FormData if uploading image
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Register Error:", err);
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const res = await fetch(`${backendUrl}/api/v1/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Login Error:", err);
  }
};

// Logout
export const logoutUser = async () => {
  try {
    const res = await fetch(`${backendUrl}/api/v1/user/logout`, {
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Logout Error:", err);
  }
};

// Get profile
export const getProfile = async () => {
  try {
    const res = await fetch(`${backendUrl}/api/v1/user/me`, {
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Get Profile Error:", err);
  }
};

// ===================== Auction Routes =====================

// Get all auction items
export const getAuctionItems = async () => {
  try {
    const res = await fetch(`${backendUrl}/api/v1/auctionitem`);
    return await res.json();
  } catch (err) {
    console.error("Get Auction Items Error:", err);
  }
};

// Create auction item
export const createAuctionItem = async (formData) => {
  try {
    const res = await fetch(`${backendUrl}/api/v1/auctionitem`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Create Auction Item Error:", err);
  }
};

// ===================== Bid Routes =====================

// Place a bid
export const placeBid = async (bidData) => {
  try {
    const res = await fetch(`${backendUrl}/api/v1/bid`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bidData),
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Place Bid Error:", err);
  }
};

// ===================== Commission Routes =====================

// Get commissions
export const getCommissions = async () => {
  try {
    const res = await fetch(`${backendUrl}/api/v1/commission`, {
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Get Commissions Error:", err);
  }
};

// ===================== SuperAdmin Routes =====================

// Example: fetch leaderboard
export const fetchLeaderboard = async () => {
  try {
    const res = await fetch(`${backendUrl}/api/v1/user/leaderboard`, {
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Fetch Leaderboard Error:", err);
  }
};
