import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constant";
import { notification } from "antd";

export const createAttendance = createAsyncThunk(
  "admin/createAttendance",
  async (
    { emailId, name},
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/attendance/attendanceCreate`,
        {
          emailId,
          name
        }
      );
      if (response.data.message) {
        notification.success({
          message: "Success",
          description: response.data.message,
        });
      }
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        notification.error({
          message: "Error",
          description: error.response.data.message,
        });
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const departureAttendance = createAsyncThunk(
  "admin/departureAttendance",
  async (
    { emailId, remarks },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/attendance/attendanceUpdate`,
        { emailId, remarks }
      );
      if (response.data.message) {
        notification.success({
          message: "Success",
          description: response.data.message,
        });
      }
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        notification.error({
          message: "Error",
          description: error.response.data.message,
        });
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllAttendence = createAsyncThunk(
  "admin/getAllAttendence",
  async (projectId) => {
    try {
    const response = await axios.get(BASE_URL + "/api/attendance/getAllUser");
    return response.data;
    } catch (error) {
      return error
    }
  }
);

export const getOneUserAttendence = createAsyncThunk(
  "admin/getOneUserAttendence",
  async ({ emailId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/attendance/getUserAttendance/${emailId}`
      );
      return response.data.data;
    } catch (error) {
      return error
    }
  }
);

export const approveDeparture = createAsyncThunk(
  "admin/approveDeparture",
  async ({ _id, approve }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/attendance/approveDeparture`,
        {
          _id,
          approve,
        }
      );
      if (response.data.success===true) {
        notification.success({
          description: response.data.message,
        });
      }
      if (response.data.success===false) {
        notification.error({
          description: response.data.message,
        });
      }
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        notification.error({
          message: "Error",
          description: error.response.data.message,
        });
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTodayAttendance = createAsyncThunk(
  "admin/getTodayAttendance",
  async (projectId) => {
    try {
      const response = await axios.get(
        BASE_URL + "/api/attendance/getTodayAttendance"
      );
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        notification.error({
          message: "Error",
          description: error.response.data.message,
        });
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const getLastWeekAttendance = createAsyncThunk(
  "admin/getLastWeekAttendance",
  async (projectId) => {
    try {
      const response = await axios.get(
        BASE_URL + "/api/attendance/getLastWeekAttendance"
      );
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        notification.error({
          message: "Error",
          description: error.response.data.message,
        });
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const getLastMonthAttendance = createAsyncThunk(
  "admin/getLastMonthAttendance",
  async (projectId) => {
    try {
      const response = await axios.get(
        BASE_URL + "/api/attendance/getLastMonthAttendance"
      );
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        notification.error({
          message: "Error",
          description: error.response.data.message,
        });
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAttendanceByName = createAsyncThunk(
  "admin/getAttendanceByName",
  async ({ emailId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        BASE_URL + `/api/attendance/getAttendanceByName`,
        { emailId }
      );
      return response.data.data;
    } catch (error) {
      return error
    }
  }
);
export const getRangeSelectedAttendance = createAsyncThunk(
  "admin/getRangeSelectedAttendance",
  async ({ fromDate, toDate }, projectId) => {
    try {
      const response = await axios.post(
        BASE_URL + "/api/attendance/getRangeSelectedAttendance",
        { fromDate, toDate }
      );
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        notification.error({
          message: "Error",
          description: error.response.data.message,
        });
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    createAttendance: { data: [], loading: "idle", error: null },
    departureAttendance: { data: [], loading: "idle", error: null },
    getAllAttendence: { data: [], loading: "idle", error: null },
    getOneUserAttendence: { data: [], loading: "idle", error: null },
    approveDeparture: { data: [], loading: "idle", error: null },
    getTodayAttendance: { data: [], loading: "idle", error: null },
    getLastWeekAttendance: { data: [], loading: "idle", error: null },
    getLastMonthAttendance: { data: [], loading: "idle", error: null },
    getAttendanceByName: { data: [], loading: "idle", error: null },
    getRangeSelectedAttendance: { data: [], loading: "idle", error: null },
  },
  reducers: {},
  extraReducers: (builder) => {
    //createAttendance
    builder.addCase(createAttendance.pending, (state, action) => {
      state.createAttendance.loading = "loading";
    });
    builder.addCase(createAttendance.fulfilled, (state, action) => {
      state.createAttendance.data = action.payload;
      state.createAttendance.loading = "succeeded";
    });
    builder.addCase(createAttendance.rejected, (state, action) => {
      state.createAttendance.error = action.error.message;
      state.createAttendance.loading = "failed";
    });
    //departureAttendance
    builder.addCase(departureAttendance.pending, (state, action) => {
      state.departureAttendance.loading = "loading";
    });
    builder.addCase(departureAttendance.fulfilled, (state, action) => {
      state.departureAttendance.data = action.payload;
      state.departureAttendance.loading = "succeeded";
    });
    builder.addCase(departureAttendance.rejected, (state, action) => {
      state.departureAttendance.error = action.error.message;
      state.departureAttendance.loading = "failed";
    });
    //   getAllAttendence
    builder.addCase(getAllAttendence.pending, (state) => {
      state.getAllAttendence.loading = "loading";
    });
    builder.addCase(getAllAttendence.fulfilled, (state, action) => {
      state.getAllAttendence.data = action.payload;
      state.getAllAttendence.loading = "succeeded";
      state.getAllAttendence.status = "succeeded";
    });
    builder.addCase(getAllAttendence.rejected, (state, action) => {
      state.getAllAttendence.error = action.error.message;
      state.getAllAttendence.loading = "failed";
    });
    //   getOneUserAttendence
    builder.addCase(getOneUserAttendence.pending, (state) => {
      state.getOneUserAttendence.loading = "loading";
    });
    builder.addCase(getOneUserAttendence.fulfilled, (state, action) => {
      state.getOneUserAttendence.data = action.payload;
      state.getOneUserAttendence.loading = "succeeded";
    });
    builder.addCase(getOneUserAttendence.rejected, (state, action) => {
      state.getOneUserAttendence.error = action.error.message;
      state.getOneUserAttendence.loading = "failed";
    });
    // approveDeparture
    builder.addCase(approveDeparture.pending, (state) => {
      state.approveDeparture.loading = "loading";
    });
    builder.addCase(approveDeparture.fulfilled, (state, action) => {
      state.approveDeparture.data = action.payload;
      state.approveDeparture.loading = "succeeded";
      state.approveDeparture.status = "Accepted";
    });
    builder.addCase(approveDeparture.rejected, (state, action) => {
      state.approveDeparture.error = action.error.message;
      state.approveDeparture.loading = "failed";
      // state.approveDeparture.status = "Rejected";
    });

    //   getTodayAttendance
    builder.addCase(getTodayAttendance.pending, (state) => {
      state.getTodayAttendance.loading = "loading";
    });
    builder.addCase(getTodayAttendance.fulfilled, (state, action) => {
      state.getTodayAttendance.data = action.payload;
      state.getTodayAttendance.loading = "succeeded";
      state.getTodayAttendance.status = "succeeded";
    });
    builder.addCase(getTodayAttendance.rejected, (state, action) => {
      state.getTodayAttendance.error = action.error.message;
      state.getTodayAttendance.loading = "failed";
    });
    //   getLastWeekAttendance
    builder.addCase(getLastWeekAttendance.pending, (state) => {
      state.getLastWeekAttendance.loading = "loading";
    });
    builder.addCase(getLastWeekAttendance.fulfilled, (state, action) => {
      state.getLastWeekAttendance.data = action.payload;
      state.getLastWeekAttendance.loading = "succeeded";
    });
    builder.addCase(getLastWeekAttendance.rejected, (state, action) => {
      state.getLastWeekAttendance.error = action.error.message;
      state.getLastWeekAttendance.loading = "failed";
    });
    //   getLastMonthAttendance
    builder.addCase(getLastMonthAttendance.pending, (state) => {
      state.getLastMonthAttendance.loading = "loading";
    });
    builder.addCase(getLastMonthAttendance.fulfilled, (state, action) => {
      state.getLastMonthAttendance.data = action.payload;
      state.getLastMonthAttendance.loading = "succeeded";
      state.getLastMonthAttendance.status = "succeeded";
    });
    builder.addCase(getLastMonthAttendance.rejected, (state, action) => {
      state.getLastMonthAttendance.error = action.error.message;
      state.getLastMonthAttendance.loading = "failed";
    });
    //   getAttendanceByName
    builder.addCase(getAttendanceByName.pending, (state) => {
      state.getAttendanceByName.loading = "loading";
    });
    builder.addCase(getAttendanceByName.fulfilled, (state, action) => {
      state.getAttendanceByName.data = action.payload;
      state.getAttendanceByName.loading = "succeeded";
      state.getAttendanceByName.status = "succeeded";
    });
    builder.addCase(getAttendanceByName.rejected, (state, action) => {
      state.getAttendanceByName.error = action.error.message;
      state.getAttendanceByName.loading = "failed";
    });
    //   getRangeSelectedAttendance
    builder.addCase(getRangeSelectedAttendance.pending, (state) => {
      state.getRangeSelectedAttendance.loading = "loading";
    });
    builder.addCase(getRangeSelectedAttendance.fulfilled, (state, action) => {
      state.getRangeSelectedAttendance.data = action.payload;
      state.getRangeSelectedAttendance.loading = "succeeded";
      state.getRangeSelectedAttendance.status = "succeeded";
    });
    builder.addCase(getRangeSelectedAttendance.rejected, (state, action) => {
      state.getRangeSelectedAttendance.error = action.error.message;
      state.getRangeSelectedAttendance.loading = "failed";
    });
  },
});

export default adminSlice.reducer;
