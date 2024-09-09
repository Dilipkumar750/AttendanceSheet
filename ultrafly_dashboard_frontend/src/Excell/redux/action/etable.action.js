import { GET_TABLE_VALUE, POST_TABLE_VALUE, EDIT_TABLE_VALUE } from "../constant";

export const geteTablevalue = (data) => {
  return {
    type: GET_TABLE_VALUE,
    payload:data
  };
};

export const posteTablevalue = (data) => {
  return{
    type:POST_TABLE_VALUE,
    payload:data
  }
}

export const editTableValue = (id, updatedData) => {
  console.log('action',id,updatedData)
  return {
    type: EDIT_TABLE_VALUE,
    payload: { id, updatedData },
  };
};
