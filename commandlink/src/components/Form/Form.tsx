import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { FieldType, Field } from '../../Interfaces/types';
import { TextField, SelectField as Select, TextAreaField} from '../Fields/Index';
import { Grid } from '../Grid';

import { useDispatch } from 'react-redux';
import { setFieldSetData } from '../../store/formSlice';
import fieldSetData from '../../utils/field-set.json'; // Your JSON data

const Form = () => {
  const { register, handleSubmit } = useForm();
  const fieldSets = useSelector((state: RootState) => state.form.fieldSetData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFieldSetData(fieldSetData));
  }, [dispatch]);


  const renderField = (field : Field) => {
    switch (field.type) {
      case FieldType.Text:
        return (<>
        <span>{field.id}:</span>
            <TextField key={field.id} field={field} register={register} />
            </> ) ;
      case FieldType.Select:
        return (<>
          <span>{field.id}:</span><Select key={field.id} field={field} register={register} />  </> ) ;
      case FieldType.TextArea:
        return(<>
        <span>{field.id}:</span> <TextAreaField key={field.id} field={field} register={register} />;
        </> ) ;
      default:
        return null;
    }
  };

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        {fieldSets.map((fieldSet, index) =>
          Array.isArray(fieldSet) ? fieldSet.map(field => renderField(field)) : renderField(fieldSet)
        )}
      </Grid>
      <input type="submit" />
    </form>
  );
};

export default Form;