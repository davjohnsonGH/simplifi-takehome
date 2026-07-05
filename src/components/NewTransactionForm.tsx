// data for options
import { TRANSACTION_CATEGORIES } from "../types";
// components
import Datepicker from "./Datepicker";
import NumberInput from "./NumberInput";
import TextInput from "./TextInput";
import Select from "./Select";

interface NewTransactionFormProps {
  //   temp: string;
}
const elIdPrefix = "new-transaction-form";

export default function NewTransactionForm({}: NewTransactionFormProps) {
  const options = TRANSACTION_CATEGORIES.map((category) => ({
    label: category,
    value: category,
  }));
  return (
    <div>
      <Datepicker id={elIdPrefix + "-datepicker"} label="Transaction date" />
      <NumberInput
        id={elIdPrefix + "-numberinput"}
        label="Transaction amount"
      />
      <TextInput id={elIdPrefix + "-textinput"} label="Input merchant" />
      <Select
        id={elIdPrefix + "-select"}
        label="Select category"
        options={options}
      />
    </div>
  );
}
