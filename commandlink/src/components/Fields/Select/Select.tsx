import React from 'react';
import styled, {css} from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateFieldValue } from '../../../store/formSlice';
import { RootState } from '../../../store/store';
import {  Field } from '../../../Interfaces/types';

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledLabel = styled.label<{ $isSubmitted: boolean }>`
  margin-bottom: 8px;
  display: block;
  font-size: 1rem;
  margin-top: 10px;
  color: rgba(0, 0, 0, 0.87);

  ${({ $isSubmitted }) => {
        if ($isSubmitted) {
            return css`
                 display: inline-block;
            `;
        }
    }}
`;

const StyledValue = styled.span<{ $isSubmitted: boolean }>`
  padding: 10px;
  margin-bottom: 16px;
  display: inline-block;

  ${({ $isSubmitted }) =>
    $isSubmitted &&
    css`
      background-color: #e0e0e0;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 2px;
      margin-left:5px;
    `}
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8rem;
  margin-top: 4px;
  display: block;
`;

const Select = ({ field, register, isSubmitted, errors }: { field: Field, register: any, isSubmitted: boolean, errors: any }) => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.form.fieldValues[field.id] || '');
  const handleChange = (e: { target: { value: any; }; }) => {
    dispatch(updateFieldValue({ fieldId: field.id, value: e.target.value }));
  };

  const defaultOptionText = "Please select an option";

  return (
    <div>
      <StyledLabel $isSubmitted={isSubmitted} htmlFor={field.id}>{field.id}</StyledLabel>
      {isSubmitted ? (
        <StyledValue $isSubmitted={isSubmitted} data-testid={field.id}>{value}</StyledValue>
      ) : (
        <StyledSelect
          {...register(field.id, { required: field.required })}
          id={field.id}
          aria-required={field.required?.value ? "true" : "false"}
          aria-label={field.id}
          onChange={handleChange}
          value={value}
          data-testid={field.id}
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
    {errors[field.id] && <ErrorMessage data-testid={`errorMessage-${field.id}`}>{errors[field.id].message}</ErrorMessage>}
    </div>
  );
};

export default Select;