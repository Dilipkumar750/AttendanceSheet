import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constant";
import { notification } from "antd";
import { data } from "autoprefixer";

export const postExceltablevalue = createAsyncThunk(
  "excel/postExceltablevalue",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        BASE_URL + "/api/ultrafly/post/excel_data",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
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
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getExceltablevalue = createAsyncThunk(
  "excel/getExceltablevalue",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        BASE_URL + "/api/ultrafly/get/excel_data");
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
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const excelSlice = createSlice({
  name: "excel",
  initialState: {
    entities: [],
    loading: "idle",
    error: null,
    postExceltablevalue: { files: [], loading: "idle", error: null },
    getExceltablevalue: { data: [], loading: "idle", error: null },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postExceltablevalue.pending, (state, action) => {
      state.postExceltablevalue.loading = "loading";
    });
    builder.addCase(postExceltablevalue.fulfilled, (state, action) => {
      state.postExceltablevalue.files = action.payload;
      state.postExceltablevalue.loading = "succeeded";
    });
    builder.addCase(postExceltablevalue.rejected, (state, action) => {
      state.postExceltablevalue.error = action.error.message;
      state.postExceltablevalue.loading = "failed";
    });
    // getExceltablevalue
    builder.addCase(getExceltablevalue.pending, (state, action) => {
      state.getExceltablevalue.loading = "loading";
    });
    builder.addCase(getExceltablevalue.fulfilled, (state, action) => {
      state.getExceltablevalue.data = action.payload;
      state.getExceltablevalue.loading = "succeeded";
    });
    builder.addCase(getExceltablevalue.rejected, (state, action) => {
      state.getExceltablevalue.error = action.error.message;
      state.getExceltablevalue.loading = "failed";
    });
  },
});

export default excelSlice.reducer;
