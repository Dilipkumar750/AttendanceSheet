import axios from "axios";
import { takeEvery, put, call } from 'redux-saga/effects';
import { GET_TABLE_VALUE, HOST, POST_TABLE_VALUE, SET_TABLE_VALUE,EDIT_TABLE_VALUE } from "../constant";
import {geteTablevalue} from '../action/etable.action.js'
// geteTablevalue 
// Saga to fetch table values
function* getexcelTablevalue() {
  try {
    const response = yield call(axios.get, `${HOST}/api/ultrafly/get/excel_data`);
    const data = response.data;
    yield put({ type: SET_TABLE_VALUE, payload: response.data });
  } catch (error) {
    console.error("Failed to fetch table data:", error);
  }
}

// Saga watcher for GET_TABLE_VALUE
export function* gettableSaga() {
  yield takeEvery(GET_TABLE_VALUE, getexcelTablevalue);
}

// Saga to post Excel table data
function* postExceltablevalue(action) {
  try {
    // Send FormData via Axios post request
   const response= yield call(axios.post, `${HOST}/api/ultrafly/post/excel_data`, action.payload);
    
    // Fetch updated table values after upload
    // yield call(getexcelTablevalue);
    yield put(geteTablevalue(response.data));
  } catch (error) {
    console.error("Failed to upload file:", error);
  }
}

// Saga watcher for POST_TABLE_VALUE
export function* posttablesaga() {
  yield takeEvery(POST_TABLE_VALUE, postExceltablevalue);
}

function* editTableData(action) {
  try {
    const { id ,updatedData} = action.payload.id;
    console.log("saga",action.payload)
    let response = null
    yield call(axios.put, `${HOST}/api/ultrafly/post/excel_data/${id}`, updatedData).then(()=>{
       response = (axios.get, `${HOST}/api/ultrafly/get/excel_data`);
    });
    // Optionally refresh the table data after editing
    
    yield put({ type: GET_TABLE_VALUE, payload: response.data });
  } catch (error) {
    console.error('Failed to edit table data:', error);
  }
}

export function* watchEditTableData() {
  yield takeEvery(EDIT_TABLE_VALUE, editTableData);
}