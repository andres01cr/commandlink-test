import React from 'react';
import styled, {css} from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateFieldValue } from '../../../store/formSlice';
import { RootState } from '../../../store/store';
import { Field } from '../../../Interfaces/types';

const StyledLabel = styled.label<{ $isSubmitted: boolean }>`
  margin-bottom: 8px;
  display: block;
  font-size: 1rem;
  margin-top: 10px;
  color: rgba(0, 0, 0, 0.87);

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  ${({ $isSubmitted }) => {
        if ($isSubmitted) {
            return css`
                 display: inline-block;
            `;
        }
    }}
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 0 10px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
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

const Text = ({ field, register, errors, isSubmitted }: { field: Field, register: any, isSubmitted: boolean, errors: any }) => {
  const dispatch = useDispatch();

  const value = useSelector((state: RootState) => state.form?.fieldValues?.[field.id] || '');

  const handleChange = (e: { target: { value: any; }; }) => {
    dispatch(updateFieldValue({ fieldId: field.id, value: e.target.value }));
  };
  return (
    <div>
      <StyledLabel $isSubmitted={isSubmitted} htmlFor={field.id}>{field.id}</StyledLabel>
      { isSubmitted ? (
        <StyledValue  $isSubmitted={isSubmitted} data-testid={field.id}>{value}</StyledValue>
      ) : (
      <StyledInput
        {...register(field.id, {
          required: field.required,
          pattern: { value: new RegExp( field.validation?.pattern?.value || ''), message: field.validation?.pattern?.message }
        })}
        placeholder={field.placeholder}
        type="text"
        id={field.id}
        aria-required={field.required?.value ? 'true' : 'false'}
        aria-label={field.id}
        onChange={handleChange}
        value={value}
        data-testid={field.id}
      />
      )}
      {errors[field.id] && <ErrorMessage data-testid={`errorMessage-${field.id}`}>{errors[field.id].message}</ErrorMessage>}
    </div>
  );
};

export default Text;