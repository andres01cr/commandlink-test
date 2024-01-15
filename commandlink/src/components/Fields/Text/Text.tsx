import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateFieldValue } from '../../../store/formSlice';
import { RootState } from '../../../store/store';

const StyledLabel = styled.label`
  margin-bottom: 8px;
  display: block;
  font-size: 1rem;
  margin-top: 10px;
  color: rgba(0, 0, 0, 0.87);

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const StyledInput = styled.input`
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

const Text = ({ field, register, errors, isSubmitted }) => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.form.fieldValues[field.id]);

  const handleChange = (e) => {
    dispatch(updateFieldValue({ fieldId: field.id, value: e.target.value }));
  };

  return (
    <div>
      <StyledLabel htmlFor={field.id}>{field.id}</StyledLabel>
      { isSubmitted ? (
        <StyledValue> { value }</StyledValue>
      ) : (
      <StyledInput
        {...register(field.id, {
          required: field.required,
          pattern: { value: new RegExp( field.validation?.pattern?.value)}
        })}
        placeholder={field.placeholder}
        type="text"
        id={field.id}
        aria-required={field.required ? 'true' : 'false'}
        aria-label={field.id}
        onChange={handleChange}
        value={value || ''}
      />
      )}
      {errors[field.id] && <ErrorMessage>{errors[field.id].message}</ErrorMessage>}
    </div>
  );
};

export default Text;