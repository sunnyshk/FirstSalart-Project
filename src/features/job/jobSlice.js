import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { getFromLocalStorage } from "../../utils/localStorage";
import { logoutUser } from "../user/userSlice";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOption: ["full-time", "part-time", "remote", "leadership"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const createJob = createAsyncThunk(
  "job/createJob",
  async (job, thunkAPI) => {
    try {
      const res = await customFetch.post("/jobs", job, {
        headers: {
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzI1ZjFlNTU0Mzk4NTAwMDRjYjYxYWMiLCJuYW1lIjoic3VubnkxIiwiaWF0IjoxNjYzNDMxMTkxLCJleHAiOjE2NjYwMjMxOTF9.BuncTWAZshovC6w-hNqKD3Q_CDCv5WX5-Hs0es5jwsI
          `,
        },
      });
      thunkAPI.dispatch(clearValues);
      return res.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("Unauthorized Logging out..");
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "/job/deleteJob",
  async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
      const res = await customFetch.delete(`/jobs/${jobId}`, {
        headers: {
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzI1ZjFlNTU0Mzk4NTAwMDRjYjYxYWMiLCJuYW1lIjoic3VubnkxIiwiaWF0IjoxNjYzNDMxMTkxLCJleHAiOjE2NjYwMjMxOTF9.BuncTWAZshovC6w-hNqKD3Q_CDCv5WX5-Hs0es5jwsI
          `,
        },
      });
      thunkAPI.dispatch(getAllJobs());
      return res.data.msg;
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
      thunkAPI.rejectWithValue("Error");
    }
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return initialState;
    },
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Job Created!");
    },
    [createJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [deleteJob.fulfilled]:(state,{payload})=>{
      toast.success("Job removed successfully")
    },
    [deleteJob.rejected]:(state,{payload})=>{
       toast.error("Something went wrong")
    }
  },
});

export const { handleChange, clearValues } = jobSlice.actions;

export default jobSlice.reducer;
