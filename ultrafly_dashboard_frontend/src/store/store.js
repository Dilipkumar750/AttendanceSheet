import { configureStore } from "@reduxjs/toolkit";
import authSlice from './features/authSlice';
import userApiSlice from "./api/userApiSlice";
import resumeSlice from './resumeuplader/resumeuploader'
import adminSlice from './admin/adminSlice'
import createSagaMiddleware from "@redux-saga/core";
import excelSlice from "./excel/excelSlice";
// import rootreducer from "../Excell/redux/rootreducer";
// import { gettableSaga, posttablesaga, watchEditTableData } from "../Excell/redux/saga/etable.saga";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: {
        // ...rootreducer,
        auth: authSlice,
        users: userApiSlice,
        admin: adminSlice,
        resumeupload: resumeSlice,
        excel: excelSlice,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
})

// sagaMiddleware.run(gettableSaga);
// sagaMiddleware.run(posttablesaga);
// sagaMiddleware.run(watchEditTableData);