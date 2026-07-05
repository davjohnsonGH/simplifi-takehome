import type { FormComponentBase } from "./types";

type Option = {
  value: string;
  label: string;
};

interface SelectProps extends FormComponentBase {
  name: string;
  placeholder: string;
  options: Option[];
}

export default function Select({
  id,
  label,
  required,
  disabled,
  name,
  placeholder,
  options,
  //   onChange,
}: SelectProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select
        name={name}
        id={id}
        required={required}
        disabled={disabled}
        // onChange={(e) => onChange(id, e.target.value)}
      >
        <option value="">{placeholder ?? "choose one"}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
