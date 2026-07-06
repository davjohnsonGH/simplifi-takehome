import type { FormComponentBase } from "./types";

type Option = {
  value: string;
  label: string;
};

interface SelectProps extends FormComponentBase {
  name?: string;
  placeholder?: string;
  multiple?: boolean;
  size?: number;
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
  multiple = false,
  size,
  onChange,
}: SelectProps) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (multiple) {
      const selectedValues = Array.from(
        event.target.selectedOptions,
        (option) => option.value,
      );
      // need to get this type safe
      onChange(id, selectedValues);
      return;
    }

    onChange(id, event.target.value);
  };

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
        multiple={multiple}
        size={size}
        onChange={handleSelectChange}
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
