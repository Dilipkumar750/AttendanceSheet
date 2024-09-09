import createSagaMiddleware from "@redux-saga/core";
import rootreducer from "../rootreducer";
import { gettableSaga, posttablesaga,watchEditTableData } from "../saga/etable.saga";
import { configureStore } from "@reduxjs/toolkit";



const sagaMiddleware = createSagaMiddleware();
const stores = configureStore({
    reducer: rootreducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(gettableSaga);
sagaMiddleware.run(posttablesaga);
sagaMiddleware.run(watchEditTableData);

export default stores;