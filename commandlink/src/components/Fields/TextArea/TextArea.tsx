import React from 'react';
import styled from 'styled-components';
import { Field } from '../../../Interfaces/types';
import { useDispatch, useSelector } from 'react-redux';
import { updateFieldValue } from '../../../store/formSlice';
import { RootState } from '../../../store/store';


const StyledLabel = styled.label`
  margin-bottom: 8px;
  display: block;
  font-size: 1rem;
  margin-top: 10px;
  color: rgba(0, 0, 0, 0.87);
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledValue = styled.label`
  padding: 10px;
  margin-bottom: 16px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8rem;
  margin-top: 4px;
  display: block;
`;

const TextArea = ({ field, register, isSubmitted, errors }: { field: Field, register: any, isSubmitted: boolean, errors: any }) => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.form.fieldValues[field.id]);


  const handleChange = (e: { target: { value: any; }; }) => {
    dispatch(updateFieldValue({ fieldId: field.id, value: e.target.value }));
  };

  return (
    <div>
      <StyledLabel htmlFor={field.id}>{field.id}</StyledLabel>
      { isSubmitted ? (
        <StyledValue  data-testid={field.id}>{value}</StyledValue>
      ) : (
      <StyledTextArea
        {...register(field.id, { required: field.required })}
        placeholder={field.placeholder}
        id={field.id}
        data-testid={field.id}
        onChange={handleChange}
        aria-required={field.required?.value ? 'true' : 'false'}
        aria-label={field.id}
        value={value}
      />
      )}
    {errors[field.id] && <ErrorMessage data-testid={`errorMessage-${field.id}`}>{errors[field.id].message}</ErrorMessage>}
    </div>
  );

}

export default TextArea;