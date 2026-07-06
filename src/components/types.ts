export type FormComponentValue = string | number | string[];

export type FormComponentBase = {
  id: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (fieldId: string, value: FormComponentValue) => void;
};
