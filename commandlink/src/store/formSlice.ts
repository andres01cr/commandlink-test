import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fieldSetData: [],
  fieldValues: {}
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFieldSetData: (state, action) => {
      state.fieldSetData = action.payload;
    },
    updateFieldValue: (state, action) => {
      const { fieldId, value } = action.payload;
      state.fieldValues[fieldId] = value;
    }
  },
});

export const { setFieldSetData, updateFieldValue } = formSlice.actions;

export default formSlice.reducer;