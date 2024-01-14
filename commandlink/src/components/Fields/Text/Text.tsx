import React from 'react';
import { Field } from '../../../Interfaces/types';

const Text = ({ field, register }: { field: Field, register: any }) => (
  <input
    {...register(field.id, { required: field.required })}
    placeholder={field.placeholder}
    type="text"
  />
);

export default Text;