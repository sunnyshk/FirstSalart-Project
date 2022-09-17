import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import custonFetch from "../../utils/axios";

const initialFilterState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFilterState,
};

export const getAllJobs = createAsyncThunk(
  "allJobs/getJobs",
  async (_, thunkAPI) => {
    let url = "/jobs";
    try {
      const res = await custonFetch.get(url, {
        headers: {
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzI1ZjFlNTU0Mzk4NTAwMDRjYjYxYWMiLCJuYW1lIjoic3VubnkxIiwiaWF0IjoxNjYzNDMxMTkxLCJleHAiOjE2NjYwMjMxOTF9.BuncTWAZshovC6w-hNqKD3Q_CDCv5WX5-Hs0es5jwsI
          `,
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("There was an error");
    }
  }
);

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  extraReducers: {
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.jobs = payload.jobs;
    },
    [getAllJobs.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export default allJobsSlice.reducer;
