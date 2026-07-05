import Datepicker from "./Datepicker";
import NumberInput from "./NumberInput";
import TextInput from "./TextInput";
interface NewTransactionFormProps {
  //   temp: string;
}
const elIdPrefix = "new-transaction-form";

export default function NewTransactionForm({}: NewTransactionFormProps) {
  return (
    <div>
      <Datepicker id={elIdPrefix + "-datepicker"} label="Transaction date" />
      <NumberInput
        id={elIdPrefix + "-numberinput"}
        label="Transaction amount"
      />
      <TextInput id={elIdPrefix + "-textinput"} label="Input merchant" />
    </div>
  );
}
