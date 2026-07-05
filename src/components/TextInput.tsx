import type { FormComponentBase } from "./types";

interface TextInputProps extends FormComponentBase {
  maxLength?: number;
  placeholder?: string;
}

export default function TextInput({
  id,
  label,
  required,
  disabled,
  maxLength,
  placeholder,
  onChange,
}: TextInputProps) {
  return (
    <div className="form-field">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        className="form-input"
        id={id}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(e) => onChange(id, e.target.value)}
      />
    </div>
  );
}
