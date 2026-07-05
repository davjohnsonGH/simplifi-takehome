import type { FormComponentBase } from "./types";

interface DatepickerProps extends FormComponentBase {
  min?: string;
  max?: string;
}

export default function Datepicker({
  id,
  label,
  min,
  max,
  required,
  disabled,
  onChange,
}: DatepickerProps) {
  return (
    <div className="form-field">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        className="form-input form-date-input"
        id={id}
        type="date"
        required={required}
        disabled={disabled}
        min={min}
        max={max}
        onChange={(e) => onChange(id, e.target.value)}
      />
    </div>
  );
}
