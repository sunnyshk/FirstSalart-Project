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
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzI2OTdhOThkYzI5MGJmMmRkNDY2YjYiLCJuYW1lIjoic3VubnkiLCJpYXQiOjE2NjM0NzM1NzcsImV4cCI6MTY2NjA2NTU3N30.veVBrkbD-SZU8O9NV4DvgOwF05HEvPzQOEkcERfS79Y
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
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzI2OTdhOThkYzI5MGJmMmRkNDY2YjYiLCJuYW1lIjoic3VubnkiLCJpYXQiOjE2NjM0NzM1NzcsImV4cCI6MTY2NjA2NTU3N30.veVBrkbD-SZU8O9NV4DvgOwF05HEvPzQOEkcERfS79Y
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

export const editJob = createAsyncThunk(
  "/job/editJob",
  async ({ jobId, job }, thunkAPI) => {
    try {
      const res = await customFetch.patch(`/jobs/${jobId}`, job, {
        headers: {
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzI2OTdhOThkYzI5MGJmMmRkNDY2YjYiLCJuYW1lIjoic3VubnkiLCJpYXQiOjE2NjM0NzM1NzcsImV4cCI6MTY2NjA2NTU3N30.veVBrkbD-SZU8O9NV4DvgOwF05HEvPzQOEkcERfS79Y
        `,
        },
      });
      thunkAPI.dispatch(clearValues());
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
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
    setEditJob: (state, { payload }) => {
      return {
        ...state,
        isEditing: true,
        ...payload,
      };
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
    [deleteJob.fulfilled]: (state, { payload }) => {
      toast.success("Job removed successfully");
    },
    [deleteJob.rejected]: (state, { payload }) => {
      toast.error("Something went wrong");
    },
    [editJob.pending]: (state) => {
      state.isLoading = true;
    },
    [editJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Job Modified!");
    },
    [editJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;
