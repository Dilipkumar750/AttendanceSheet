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

export const editExcelTable = createAsyncThunk(
  "excel/editExcelTable",
  async (
    { id, data },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/ultrafly/edit/excel_data/${id}`,
        { data }
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


export const deleteExcellRow = createAsyncThunk(
  "excel/deleteExcellRow",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/ultrafly/remove/${id}`);

      // Success notification
      if (response.data.message) {
        notification.success({
          message: "Success",
          description: response.data.message,
        });
      }

      return response.data;
    } catch (error) {
      // Error notification
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

const excelSlice = createSlice({
  name: "excel",
  initialState: {
    entities: [],
    loading: "idle",
    error: null,
    postExceltablevalue: { files: [], loading: "idle", error: null },
    getExceltablevalue: { data: [], loading: "idle", error: null },
    editExcelTable: { data: [], loading: "idle", error: null },
    deleteExcellRow: { data: [], loading: "idle", error: null },

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

    builder.addCase(editExcelTable.pending, (state, action) => {
      state.editExcelTable.loading = "loading";
    });
    builder.addCase(editExcelTable.fulfilled, (state, action) => {
      state.editExcelTable.data = action.payload;
      state.editExcelTable.loading = "succeeded";
    });
    builder.addCase(editExcelTable.rejected, (state, action) => {
      state.editExcelTable.error = action.error.message;
      state.editExcelTable.loading = "failed";
    });

    
    builder.addCase(deleteExcellRow.pending, (state, action) => {
      state.deleteExcellRow.loading = "loading";
    });
    builder.addCase(deleteExcellRow.fulfilled, (state, action) => {
      state.deleteExcellRow.data = action.payload;
      state.deleteExcellRow.loading = "succeeded";
    });
    builder.addCase(deleteExcellRow.rejected, (state, action) => {
      state.deleteExcellRow.error = action.error.message;
      state.deleteExcellRow.loading = "failed";
    });
  },
});

export default excelSlice.reducer;
