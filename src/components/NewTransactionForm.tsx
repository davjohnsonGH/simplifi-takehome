import Datepicker from "./Datepicker";
import NumberInput from "./NumberInput";
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
    </div>
  );
}
