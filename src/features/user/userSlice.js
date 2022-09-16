import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  addToLocalStorage,
} from "../../utils/localStorage";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const res = await customFetch.post("/auth/register", user);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.respose.data.msg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const res = await customFetch.post("/auth/login", user);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.respose.data.msg);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeFromLocalStorage();
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      console.log(payload);
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addToLocalStorage(user);
      toast.success(`${user.name} Thanks for registering`);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error("Something went wrong");
      console.log(payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addToLocalStorage(user);
      toast.success(`Welcome Back ${user.name}`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});
export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
