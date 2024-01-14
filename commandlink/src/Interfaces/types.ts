export enum FieldType {
    Text = 'text',
    Select = 'select',
    TextArea = 'textArea'
} 

export interface Field { 
    id: string;
    placeholder: string;
    required?: boolean;
    type: FieldType;
    options?: string[];
}