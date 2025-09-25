import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  fetchLeaderboard as fetchLeaderboardAPI,
} from "../../api"; // Import api.js functions

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    leaderboard: [],
  },
  reducers: {
    requestStart(state) {
      state.loading = true;
    },
    requestSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user || action.payload;
    },
    requestFailed(state) {
      state.loading = false;
      state.isAuthenticated = false;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = {};
    },
    setLeaderboard(state, action) {
      state.leaderboard = action.payload;
    },
    clearLoading(state) {
      state.loading = false;
    },
  },
});

export const register = (formData) => async (dispatch) => {
  dispatch(userSlice.actions.requestStart());
  try {
    const response = await registerUser(formData);
    if (response.success) {
      dispatch(userSlice.actions.requestSuccess(response));
      toast.success(response.message);
    } else {
      dispatch(userSlice.actions.requestFailed());
      toast.error(response.message);
    }
  } catch (err) {
    dispatch(userSlice.actions.requestFailed());
    toast.error(err.message);
  } finally {
    dispatch(userSlice.actions.clearLoading());
  }
};

export const login = (credentials) => async (dispatch) => {
  dispatch(userSlice.actions.requestStart());
  try {
    const response = await loginUser(credentials);
    if (response.success) {
      dispatch(userSlice.actions.requestSuccess(response));
      toast.success(response.message);
    } else {
      dispatch(userSlice.actions.requestFailed());
      toast.error(response.message);
    }
  } catch (err) {
    dispatch(userSlice.actions.requestFailed());
    toast.error(err.message);
  } finally {
    dispatch(userSlice.actions.clearLoading());
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await logoutUser();
    if (response.success) {
      dispatch(userSlice.actions.logoutSuccess());
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  } catch (err) {
    toast.error(err.message);
  }
};

export const fetchUser = () => async (dispatch) => {
  dispatch(userSlice.actions.requestStart());
  try {
    const response = await getProfile();
    if (response.success) {
      dispatch(userSlice.actions.requestSuccess(response.user));
    }
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(userSlice.actions.clearLoading());
  }
};

export const fetchLeaderboard = () => async (dispatch) => {
  dispatch(userSlice.actions.requestStart());
  try {
    const response = await fetchLeaderboardAPI();
    if (response.success) {
      dispatch(userSlice.actions.setLeaderboard(response.leaderboard));
    }
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(userSlice.actions.clearLoading());
  }
};

export default userSlice.reducer;
