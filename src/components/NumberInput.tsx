import type { FormComponentBase } from "./types";

interface NumberInputProps extends FormComponentBase {
  min?: number;
  max?: number;
  step?: string;
  placeholder?: string;
}

export default function NumberInput({
  id,
  label,
  required,
  disabled,
  min,
  max,
  step,
  placeholder,
  onChange,
}: NumberInputProps) {
  return (
    <div className="form-field">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        className="form-input"
        id={id}
        type="number"
        min={min}
        max={max}
        step={step}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(id, Number(e.target.value))}
      />
    </div>
  );
}
