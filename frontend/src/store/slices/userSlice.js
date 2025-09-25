import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL; // ✅ Read from .env file

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: null,
    leaderboard: [],
  },
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    registerFailed: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    },

    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    },

    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loadUserFailed: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    },

    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },

    leaderboardRequest: (state) => {
      state.loading = true;
    },
    leaderboardSuccess: (state, action) => {
      state.loading = false;
      state.leaderboard = action.payload;
    },
    leaderboardFailed: (state) => {
      state.loading = false;
    },
  },
});

// ✅ Async Thunks

export const register = (formData) => async (dispatch) => {
  try {
    dispatch(userSlice.actions.registerRequest());

    const { data } = await axios.post(
      `${backendUrl}/api/v1/user/register`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );

    dispatch(userSlice.actions.registerSuccess(data));
  } catch (error) {
    dispatch(userSlice.actions.registerFailed());
    throw error;
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(userSlice.actions.loginRequest());

    const { data } = await axios.post(
      `${backendUrl}/api/v1/user/login`,
      credentials,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch(userSlice.actions.loginSuccess(data));
  } catch (error) {
    dispatch(userSlice.actions.loginFailed());
    throw error;
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(userSlice.actions.loadUserRequest());

    const { data } = await axios.get(`${backendUrl}/api/v1/user/me`, {
      withCredentials: true,
    });

    dispatch(userSlice.actions.loadUserSuccess(data));
  } catch (error) {
    dispatch(userSlice.actions.loadUserFailed());
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${backendUrl}/api/v1/user/logout`, {
      withCredentials: true,
    });

    dispatch(userSlice.actions.logoutSuccess());
  } catch (error) {
    console.error("Logout failed", error);
  }
};

export const fetchLeaderboard = () => async (dispatch) => {
  try {
    dispatch(userSlice.actions.leaderboardRequest());

    const { data } = await axios.get(`${backendUrl}/api/v1/user/leaderboard`);

    dispatch(userSlice.actions.leaderboardSuccess(data.leaderboard));
  } catch (error) {
    dispatch(userSlice.actions.leaderboardFailed());
  }
};

export default userSlice.reducer;
