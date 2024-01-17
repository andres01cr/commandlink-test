import configureMockStore from 'redux-mock-store';
import formReducer, { setFieldSetData, updateFieldValue } from '../../src/store/formSlice';
import { FormState, FieldGroup, UpdateFieldValuePayload, FieldType } from '../../src/Interfaces/types';


const mockStore = configureMockStore<FormState>();

describe('form slice actions and reducers', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      fieldSetData: [],
      fieldValues: {}
    });
  });

  it('should handle initial state', () => {
    expect(formReducer(undefined, { type: 'unknown' })).toEqual({
      fieldSetData: [],
      fieldValues: {}
    });
  });

  it('should handle setFieldSetData', () => {
    const expectedFieldSetData: FieldGroup[] = [ {
        id: 'firstName',
        placeholder: 'First name',
        required:  {
          value: true,
          message: 'First Name is required'
       },
        type: FieldType.Text
      }];
    const action = setFieldSetData(expectedFieldSetData);
    expect(formReducer(undefined, action)).toEqual({
      fieldSetData: expectedFieldSetData,
      fieldValues: {}
    });
  });

  it('should handle updateFieldValue', () => {
    const initialFieldValues = {
        firstName: 'firstName',
      };
    const updatedValue: UpdateFieldValuePayload = {
        fieldId: 'firstName',
        value: 'Test Value'
    };
    const action = updateFieldValue(updatedValue);
    expect(formReducer({ fieldSetData: [], fieldValues: initialFieldValues }, action)).toEqual({
      fieldSetData: [],
      fieldValues: { 'firstName': 'Test Value' }
    });
  });
});