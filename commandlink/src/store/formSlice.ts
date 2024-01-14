import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  fieldSetData: any[];
}

const initialState: FormState = {
  fieldSetData: [],
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFieldSetData: (state, action: PayloadAction<any[]>) => {
      state.fieldSetData = action.payload;
    },
  },
});

export const { setFieldSetData } = formSlice.actions;

export default formSlice.reducer;