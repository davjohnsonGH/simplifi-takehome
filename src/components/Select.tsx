import type { FormComponentBase } from "./types";

type Option = {
  value: string;
  label: string;
};

interface SelectProps extends FormComponentBase {
  name?: string;
  placeholder?: string;
  options?: Option[];
}

export default function Select({
  id,
  label,
  required,
  disabled,
  name,
  placeholder,
  options,
  onChange,
}: SelectProps) {
  return (
    <div className="form-field">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <select
        className="form-select"
        name={name}
        id={id}
        required={required}
        disabled={disabled}
        onChange={(e) => onChange(id, e.target.value)}
      >
        <option value="">{placeholder ?? "choose one"}</option>
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
}
