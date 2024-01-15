import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateFieldValue } from '../../../store/formSlice';
import { RootState } from '../../../store/store';

const StyledSelect = styled.select`
  width: 104%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledLabel = styled.label`
  margin-bottom: 8px;
  display: block;
  font-size: 1rem;
  margin-top: 10px;
  color: rgba(0, 0, 0, 0.87);
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

const Select = ({ field, register, isSubmitted, errors }) => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.form.fieldValues[field.id]);

  const handleChange = (e) => {
    dispatch(updateFieldValue({ fieldId: field.id, value: e.target.value }));
  };

  // Default option text can be customized as needed
  const defaultOptionText = "Please select an option";

  return (
    <div>
      <StyledLabel htmlFor={field.id}>{field.id}</StyledLabel>
      {isSubmitted ? (
        <StyledValue>{value}</StyledValue>
      ) : (
        <StyledSelect
          {...register(field.id, { required: field.required })}
          id={field.id}
          aria-required={field.required ? "true" : "false"}
          aria-label={field.id}
          onChange={handleChange}
          defaultValue=""
        >
          <option value="" disabled hidden>
            {defaultOptionText}
          </option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </StyledSelect>
      )}
    {errors[field.id] && <ErrorMessage>{errors[field.id].message}</ErrorMessage>}
    </div>
  );
};

export default Select;