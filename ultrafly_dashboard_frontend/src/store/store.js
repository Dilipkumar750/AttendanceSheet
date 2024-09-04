import { configureStore } from "@reduxjs/toolkit";
import authSlice from './features/authSlice';
import userApiSlice from "./api/userApiSlice";
import resumeSlice from './resumeuplader/resumeuploader'
import adminSlice from './admin/adminSlice'


export const store = configureStore({
    reducer: {
        auth:authSlice,
        users:userApiSlice,
        admin:adminSlice,
        resumeupload:resumeSlice,

    }
})