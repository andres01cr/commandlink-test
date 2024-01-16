import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/store';
import { FieldType, Field, FieldGroup } from '../../Interfaces/types';
import { TextField, SelectField as Select, TextAreaField } from '../Fields/Index';
import { setFieldSetData } from '../../store/formSlice';
import fieldSetData from '../../utils/field-set.json';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  margin-top: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Form = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const fieldSets = useSelector((state: RootState) => state.form.fieldSetData);
  const dispatch = useDispatch();
  const [ isSubmitted , setIsSubmitted ] = useState(false);

  useEffect(() => {
    dispatch(setFieldSetData(fieldSetData));
  }, [dispatch]);

  const renderField = (field: Field) => {

    switch (field.type) {
      case FieldType.Text:
        return <TextField key={field.id} field={field} register={register} errors={errors} isSubmitted={isSubmitted}/>;
      case FieldType.Select:
        return <Select key={field.id} field={field} register={register} errors={errors} isSubmitted={isSubmitted}/>;
      case FieldType.TextArea:
        return <TextAreaField key={field.id} field={field} register={register} errors={errors} isSubmitted={isSubmitted}/>;
      default:
        return null;
    }
  };

  const renderFieldSet = (fieldSet:FieldGroup ) => {
    if (Array.isArray(fieldSet)) {
      return (
        <StyledRow key={`row-${fieldSet.map(field => field.id).join('-')}`}>
          {fieldSet.map(field => renderField(field))}
        </StyledRow>
      );
    } else {
      return renderField(fieldSet);
    }
  };

  const onSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} aria-labelledby="formTitle">
      <>
        { isSubmitted 
          ? <h2 id="formTitle">Form Submitted</h2>
          : <h2 id="formTitle">Form CommmandLink</h2> 
        }
        {fieldSets.map((fieldSet: FieldGroup, index) => renderFieldSet(fieldSet))}
        { !isSubmitted && <StyledButton type="submit">Submit</StyledButton> }
      </>
    </StyledForm>
  );
};

export default Form;