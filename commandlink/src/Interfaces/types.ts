export enum FieldType {
  Text = "text",
  Select = "select",
  TextArea = "textarea",
}

export interface ValidationPattern {
  value: string;
  message: string;
}

export interface FieldRequired {
  value: boolean;
  message: string;
}

export interface Field {
  id: string;
  placeholder?: string;
  required?: FieldRequired;
  type: FieldType | string;
  options?: string[];
  validation?: {
    pattern?: ValidationPattern;
  };
}

export type FieldGroup = Field | Field[];

export interface UpdateFieldValuePayload {
  fieldId: string;
  value: any;
}

export interface FormState {
  fieldSetData:  FieldGroup[];
  fieldValues: { [key: string]: any };
}
