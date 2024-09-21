import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notification } from "antd";
import { BASE_URL } from '../constant';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8001',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Create an async thunk for file upload
export const uploadFiles = createAsyncThunk(
  'upload/uploadFiles',
  async ({ files, jobType, email, name ,username}, { rejectWithValue }) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    formData.append('email', email);
    formData.append('name', name);
    formData.append('username', username);

    try {
      const response = await axios.post(`http://localhost:8001/api/upload/${jobType}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
       // Success notification
       if (response.data.message) {
        notification.success({
          message: "Success",
          description: response.data.message,
        });
      }
      return response.data;
    }  catch (error) {
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

export const getResume=createAsyncThunk(
  'files/getResume',
  async (selectedJobType)=>{
    const response=await axios.get(`${BASE_URL}/api/files/${selectedJobType}`)
    return response.data;
  }
)
export const getAllResume=createAsyncThunk(
  'files/getAllResume',
  async ()=>{
    try {
      const response=await axios.get(`${BASE_URL}/api/resume/get_all`)
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
    }
  }
)

export const viewResume = createAsyncThunk(
  'files/viewResume',
  async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/resume/get_view_resume/${id}`, {
        responseType: 'blob', // Ensure this is set
        headers: {
          'Content-Type': 'application/pdf',
        },
      });
      return response.data; // Return the Blob data directly
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        notification.error({
          message: "Error",
          description: error.response.data.message,
        });
      }
      throw error; // Rethrow the error to handle it in the calling function
    }
  }
);



// Create a slice
const uploadSlice = createSlice({
  name: 'resumeupload',
  initialState:{
    uploadFiles: { files:[], loading: false, error: null },
    getResume: { files:[], loading: false, error: null },
    getAllResume: { data: '', loading: "idle", error: null},
    viewResume: { data: '', loading: "idle", error: null},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFiles.pending, (state) => {
        state.uploadFiles.loading = 'loading';
      })
      .addCase(uploadFiles.fulfilled, (state, action) => {
        state.uploadFiles.loading = 'succeeded';
        state.uploadFiles.files = action.payload.files;
      })
      .addCase(uploadFiles.rejected, (state, action) => {
        state.uploadFiles.loading = 'failed';
        state.uploadFiles.error = action.error.message;
      });

      //GET RESUME REDUCER
      builder
      .addCase(getResume.pending, (state) => {
        state.resumes.loading = true;
      })
      .addCase(getResume.fulfilled, (state, action) => {
        state.resumes.loading = false;
        state.resumes.files = action.payload;
      })
      .addCase(getResume.rejected, (state, action) => {
        state.resumes.loading = false;
        state.resumes.error = action.payload;
      });
      //GET RESUME REDUCER
      builder.addCase(getAllResume.pending, (state) => {
        state.getAllResume.loading = "loading";
      });
      builder.addCase(getAllResume.fulfilled, (state, action) => {
        state.getAllResume.loading = "succeeded";
        state.getAllResume.data = action.payload;
      });
      builder.addCase(getAllResume.rejected, (state, action) => {
        state.getAllResume.loading = "failed";
        state.getAllResume.error = action.error.message;
      });
      //view resume
      builder.addCase(viewResume.pending, (state) => {
        state.viewResume.loading = "loading";
      });
      builder.addCase(viewResume.fulfilled, (state, action) => {
        state.viewResume.loading = "succeeded";
        state.viewResume.data = action.payload;
      });
      builder.addCase(viewResume.rejected, (state, action) => {
        state.viewResume.loading = "failed";
        state.viewResume.error = action.error.message;
      });
  },
});

export default uploadSlice.reducer;
