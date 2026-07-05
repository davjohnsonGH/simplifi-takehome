import { useState } from "react";
// data for options
import { TRANSACTION_CATEGORIES } from "../types";
// components
import Datepicker from "./Datepicker";
import NumberInput from "./NumberInput";
import TextInput from "./TextInput";
import Select from "./Select";

export type FormValue = string | number | boolean | FileList | null;
export type FormValues = Record<string, FormValue>;

interface NewTransactionFormProps {
  //   temp: string;
}

export default function NewTransactionForm({}: NewTransactionFormProps) {
  const [formValues, setFormValues] = useState<FormValues>({});

  const elIdPrefix = "new-transaction-form";
  const options = TRANSACTION_CATEGORIES.map((category) => ({
    label: category,
    value: category,
  }));
  function handleChange(fieldId: string, value: FormValue) {
    setFormValues((previous) => ({
      ...previous,
      [fieldId]: value,
    }));
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Datepicker
        id={elIdPrefix + "-datepicker"}
        label="Transaction date"
        onChange={handleChange}
      />
      <NumberInput
        id={elIdPrefix + "-numberinput"}
        label="Transaction amount"
        onChange={handleChange}
      />
      <TextInput
        id={elIdPrefix + "-textinput"}
        label="Input merchant"
        onChange={handleChange}
      />
      <Select
        id={elIdPrefix + "-select"}
        label="Select category"
        options={options}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
