import Datepicker from "./Datepicker";
interface NewTransactionFormProps {
  //   temp: string;
}

export default function NewTransactionForm({}: NewTransactionFormProps) {
  return (
    <div>
      <Datepicker
        id="new-transaction-form-datepicker"
        label="Transaction date"
      />
    </div>
  );
}
