import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  addToLocalStorage,
} from "../../utils/localStorage";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

let token = "";

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const res = await customFetch.post("/register", user);
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
      const res = await customFetch.post("/login", user);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.respose.data.msg);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    try {
      const res = await customFetch.patch("/updateUser", user, {
        headers: {
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzI2OTdhOThkYzI5MGJmMmRkNDY2YjYiLCJuYW1lIjoic3VubnkiLCJpYXQiOjE2NjM0NzM1NzcsImV4cCI6MTY2NjA2NTU3N30.veVBrkbD-SZU8O9NV4DvgOwF05HEvPzQOEkcERfS79Y`,
        },
      });
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
      // console.log(payload);
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
      // console.log(payload)
      token += payload.token;
      console.log(token);
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
    [updateUser.pending]: (state) => {
      state.isLoading = false;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addToLocalStorage(user);
      toast.success("Update successfull");
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});
export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
