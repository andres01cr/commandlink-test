import React from 'react';
import { Field as SelectFieldType } from '../../../Interfaces/types';

const Select = ({ field, register }: { field: SelectFieldType, register: any }) => (
  <select {...register(field.id, { required: field.required })}>
    {field.options?.map(option => (
      <option key={option} value={option}>{option}</option>
    ))}
  </select>
);

export default Select;