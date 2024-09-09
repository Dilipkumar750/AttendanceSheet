import { SET_TABLE_VALUE,POST_TABLE_VALUE, EDIT_TABLE_VALUE } from "../constant";


const initialState = {
  data: [],
};

export const exceltableData = (state = initialState, action) => {
  console.log('state',initialState)
  switch (action.type) {
    case SET_TABLE_VALUE:
      return {
        ...state,
        data: action.payload,
      };
    case POST_TABLE_VALUE:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case EDIT_TABLE_VALUE:
      console.log('Editing table data with payload:', action.payload);
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload.id
            ? { ...item, ...action.payload.updatedData }
            : item
        ),
      };
    default:
      return state;
  }
};
