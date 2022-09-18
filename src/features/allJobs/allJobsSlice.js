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
    const { search, searchStatus, searchType, sort } =
      thunkAPI.getState().allJobs;

    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url += url + `&search=${search}`;
    }
    try {
      const res = await custonFetch.get(url, {
        headers: {
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzI2OTdhOThkYzI5MGJmMmRkNDY2YjYiLCJuYW1lIjoic3VubnkiLCJpYXQiOjE2NjM0NzM1NzcsImV4cCI6MTY2NjA2NTU3N30.veVBrkbD-SZU8O9NV4DvgOwF05HEvPzQOEkcERfS79Y
          `,
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("There was an error");
    }
  }
);

export const showStats = createAsyncThunk(
  "/allJobs/showStats",
  async (_, thunkAPI) => {
    try {
      const res = await custonFetch.get("/jobs/stats", {
        headers: {
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzI2OTdhOThkYzI5MGJmMmRkNDY2YjYiLCJuYW1lIjoic3VubnkiLCJpYXQiOjE2NjM0NzM1NzcsImV4cCI6MTY2NjA2NTU3N30.veVBrkbD-SZU8O9NV4DvgOwF05HEvPzQOEkcERfS79Y`,
        },
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFilterState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
  },
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
    [showStats.pending]: (state) => {
      state.isLoading = true;
    },
    [showStats.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.stats = payload.defaultStats;
      state.monthlyApplications = payload.monthlyApplications;
    },
    [showStats.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { showLoading, hideLoading, handleChange, changePage } =
  allJobsSlice.actions;
export default allJobsSlice.reducer;
