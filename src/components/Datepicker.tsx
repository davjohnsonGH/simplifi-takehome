interface DatepickerProps {
  id: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  min?: string;
  max?: string;
  //   onChange: (fieldId: string, value: string) => void;
}

export default function Datepicker({
  id,
  label,
  min,
  max,
  required,
  disabled,
  //   onChange,
}: DatepickerProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="date"
        required={required}
        disabled={disabled}
        min={min}
        max={max}
        // onChange={(e) => onChange(id, e.target.value)}
      />
    </>
  );
}
