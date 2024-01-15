export enum FieldType {
  Text = "text",
  Select = "select",
  TextArea = "textarea",
}

export interface Field {
  id: string;
  placeholder: string;
  required?: {
    value: boolean;
    message: string;
  };
  type: FieldType;
  options?: string[];
  validation?: {
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
}
