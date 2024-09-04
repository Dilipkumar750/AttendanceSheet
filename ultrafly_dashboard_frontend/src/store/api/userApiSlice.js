import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constant";
import { notification } from "antd";
import { data } from "autoprefixer";

export const registerUser = createAsyncThunk(
  "users/register",
  async (user, thunkAPI) => {
    const { username, email, password } = user;
    try {
      const response = await axios.post(BASE_URL + "/api/users", {
        username,
        email,
        password,
      });
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

//LOGINUSER
export const loginUser = createAsyncThunk(
  "users/login",
  async (user, thunkAPI) => {
    const { email, password } = user;
    try {
      const response = await axios.post(BASE_URL + "/api/users/auth", {
        email,
        password,
      });
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
//LOGOUT
export const logoutUser = createAsyncThunk(
  "users/logout",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(BASE_URL + "/api/users/logout");
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
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (projectId) => {
    try {
      const response = await axios.get(BASE_URL + "/api/users/");
      return response.data;
    } catch (error) {
      return error
    }
  }
);
export const findUser = createAsyncThunk(
  "users/findUser",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL + `/api/users/find/profile/${email}`);
      return response.data.data;
    } catch (error) {
      return error
    }
  }
);

export const updateUserandAdmin = createAsyncThunk(
  "users/updateUserandAdmin",
  async ({ userId, updatedUserData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/users/${userId}`,
        updatedUserData
      );

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

export const ProfileUpdate = createAsyncThunk(
  "users/ProfileUpdate",
  async (
    {
      userId,
      username,
      email,
      gender,
      birthdate,
      image,
      employeeCode,
      DateOfjoining,
      position,
    },
    { rejectWithValue }
  ) => {
    const formData = new FormData();
    formData.append("email", email);
    // Append other fields
    formData.append("username", username);
    formData.append("gender", gender);
    formData.append("birthdate", birthdate);
    formData.append("employeeCode", employeeCode);
    formData.append("DateOfjoining", DateOfjoining);
    formData.append("position", position);
    // For file upload
    if (image) {
      formData.append("file", image); // Assuming `image` is a file object
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/api/users/profile/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
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
export const deleteUserandAdmin = createAsyncThunk(
  "users/deleteUserandAdmin",
  async ({ userId, deletedUserData }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/users/${userId}`,
        userId
      );

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
export const ProfileuploadImage = createAsyncThunk(
  "users/ProfileuploadImage",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/uploads/profile`,
        data
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

export const getImage = createAsyncThunk("users/getImage", async (filename) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/users/profile/image/${filename}`, 
      { responseType: 'arraybuffer' } 
    );

    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const imageUrl = URL.createObjectURL(blob);
    
    return imageUrl;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      notification.error({
        message: "Error",
        description: error.response.data.message,
      });
    }
    return rejectWithValue(error.response.data);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
    loading: "idle",
    error: null,
    getAllUsers: { data: [], loading: "idle", error: null },
    updateUserandAdmin: { data: [], loading: "idle", error: null },
    deleteUserandAdmin: { data: [], loading: "idle", error: null },
    ProfileuploadImage: { data: [], loading: "idle", error: null },
    ProfileUpdate: { data: [], loading: "idle", error: null },
    getImage: { data: '', loading: "idle", error: null },
    findUser: { data: '', loading: "idle", error: null },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = "loading";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = "idle";
      state.entities.push(action.payload);
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });

    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = "loading";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = "idle";
      state.entities.push(action.payload);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });

    //GET ALL USERS
    builder.addCase(getAllUsers.pending, (state) => {
      state.getAllUsers.loading = "loading";
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.getAllUsers.data = action.payload;
      state.getAllUsers.loading = "succeeded";
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.getAllUsers.error = action.error.message;
      state.getAllUsers.loading = "failed";
    });

    //UPDATE UPDATE USER AND ADMIN
    builder.addCase(updateUserandAdmin.pending, (state, action) => {
      state.updateUserandAdmin.loading = "loading";
    });
    builder.addCase(updateUserandAdmin.fulfilled, (state, action) => {
      state.updateUserandAdmin.data = action.payload;
      state.updateUserandAdmin.loading = "succeeded";
    });
    builder.addCase(updateUserandAdmin.rejected, (state, action) => {
      state.updateUserandAdmin.error = action.error.message;
      state.updateUserandAdmin.loading = "failed";
    });

    //DELETE DELETE USER AND ADMIN WITH ID
    builder.addCase(deleteUserandAdmin.pending, (state, action) => {
      state.deleteUserandAdmin.loading = "loading";
    });
    builder.addCase(deleteUserandAdmin.fulfilled, (state, action) => {
      state.deleteUserandAdmin.data = action.payload;
      state.deleteUserandAdmin.loading = "succeeded";
    });
    builder.addCase(deleteUserandAdmin.rejected, (state, action) => {
      state.deleteUserandAdmin.error = action.error.message;
      state.deleteUserandAdmin.loading = "failed";
    });

    //POST PROFILE UPLOAD IMAGE
    builder.addCase(ProfileuploadImage.fulfilled, (state, action) => {
      const { payload } = action;
      state.projectImage = payload;
    });
    // builder.addCase(ProfileuploadImage.pending, (state) => {
    //   state.ProfileuploadImage.loading = "loading";
    // });
    // builder.addCase(ProfileuploadImage.fulfilled, (state, action) => {
    //   state.ProfileuploadImage.loading = "succeeded";
    //   state.ProfileuploadImage.data = action.payload;
    // });
    // builder.addCase(ProfileuploadImage.rejected, (state, action) => {
    //   state.ProfileuploadImage.loading = "failed";
    //   state.ProfileuploadImage.error = action.error.message;
    // });

    // POST PROFILE UPDATE
    builder.addCase(ProfileUpdate.pending, (state) => {
      state.ProfileUpdate.loading = "loading";
    });
    builder.addCase(ProfileUpdate.fulfilled, (state, action) => {
      state.ProfileUpdate.loading = "succeeded";
      state.ProfileUpdate.data = action.payload;
    });
    builder.addCase(ProfileUpdate.rejected, (state, action) => {
      state.ProfileUpdate.loading = "failed";
      state.ProfileUpdate.error = action.error.message;
    });
    // POST PROFILE UPDATE
    builder.addCase(getImage.pending, (state) => {
      state.getImage.loading = "loading";
    });
    builder.addCase(getImage.fulfilled, (state, action) => {
      state.getImage.loading = "succeeded";
      state.getImage.data = action.payload;
    });
    builder.addCase(getImage.rejected, (state, action) => {
      state.getImage.loading = "failed";
      state.getImage.error = action.error.message;
    });
    // findUser
    builder.addCase(findUser.pending, (state) => {
      state.findUser.loading = "loading";
    });
    builder.addCase(findUser.fulfilled, (state, action) => {
      state.findUser.loading = "succeeded";
      state.findUser.data = action.payload;
    });
    builder.addCase(findUser.rejected, (state, action) => {
      state.findUser.loading = "failed";
      state.findUser.error = action.error.message;
    });
  },
});

export default usersSlice.reducer;
