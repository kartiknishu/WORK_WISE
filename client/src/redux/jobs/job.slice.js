import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  error: null,
  loading: false,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
      state.loading = false;
      state.error = null;
    },
    // Action for createing a new job
    createJobStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createJobSuccess: (state, action) => {
      state.jobs.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createJobFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Action for updating a job by jobId
    updateJobStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateJobSuccess: (state, action) => {
      const updatedJob  = action.payload;
      const index = state.jobs.findIndex((job) => job._id === updatedJob._id);
      if (index !== -1) {
        state.jobs[index] = updatedJob;
      }
      state.loading = false;
      state.error = null;
    },
    updateJobFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Action for deleting a job by jobId
    deleteJobStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteJobSuccess: (state, action) => {
      const jobIdToDelete = action.payload;
      state.jobs = state.jobs.filter((job) => job._id !== jobIdToDelete);
      state.loading = false;
      state.error = null;
    },
    deleteJobFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setJobs,
  createJobStart,
  createJobSuccess,
  createJobFailure,
  updateJobStart,
  updateJobSuccess,
  updateJobFailure,
  deleteJobStart,
  deleteJobSuccess,
  deleteJobFailure,
} = jobSlice.actions;

export default jobSlice.reducer;
