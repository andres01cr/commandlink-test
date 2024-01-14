import React from 'react';
import { Field } from '../../../Interfaces/types';

const TextArea = ({ field, register }: { field: Field, register: any }) => (
  <textarea
    {...register(field.id, { required: field.required })}
    placeholder={field.placeholder}
  />
);

export default TextArea;