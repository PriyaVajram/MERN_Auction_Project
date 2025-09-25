// src/api.js

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Example: test backend route
export const testBackend = async () => {
  try {
    const res = await fetch(`${backendUrl}/api/v1/user/test`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("API Error:", err);
  }
};

// Example: register user
export const registerUser = async (formData) => {
  try {
    const res = await fetch(`${backendUrl}/api/v1/user/register`, {
      method: "POST",
      body: formData, // FormData if uploading profile image
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Register Error:", err);
  }
};

// Add more functions as needed for login, auctions, bids, etc.
