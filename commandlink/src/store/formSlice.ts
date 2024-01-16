import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { UpdateFieldValuePayload, FormState, FieldGroup } from '../Interfaces/types';

const initialState: FormState= {
  fieldSetData: [],
  fieldValues: {}
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFieldSetData: (state, action: PayloadAction<FieldGroup[]>) => {
      state.fieldSetData = action.payload;
    },
    updateFieldValue: (state, action: PayloadAction<UpdateFieldValuePayload>) => {
      const { fieldId, value } = action.payload;
      state.fieldValues[fieldId] = value;
    }
  },
});

export const { setFieldSetData, updateFieldValue } = formSlice.actions;

export default formSlice.reducer;