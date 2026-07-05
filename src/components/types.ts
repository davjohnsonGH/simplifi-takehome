export type FormComponentBase = {
  id: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (fieldId: string, value: string | number) => void;
};
