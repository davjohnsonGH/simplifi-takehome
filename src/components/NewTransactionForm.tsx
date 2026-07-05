import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addTransaction } from "../features/transactions/transactionsSlice";
// data for options
import { TRANSACTION_CATEGORIES, Transaction } from "../types";
// components
import Datepicker from "./Datepicker";
import NumberInput from "./NumberInput";
import TextInput from "./TextInput";
import Select from "./Select";

type FormValue = string | number | boolean | FileList | null;
type FormValues = Record<string, FormValue>;
type DraftTransaction = Omit<
  Transaction,
  "id" | "date" | "merchant" | "category" | "amount"
>;

type NewTransactionFormProps = {
  onSubmitSuccess?: () => void;
};

export default function NewTransactionForm({
  onSubmitSuccess,
}: NewTransactionFormProps) {
  const [formValues, setFormValues] = useState<FormValues>({});
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) => state.transactions.items);

  const options = TRANSACTION_CATEGORIES.map((category) => ({
    label: category,
    value: category,
  }));
  const createNewTransaction = (values: DraftTransaction) => {
    const lastId = transactions[transactions.length - 1]?.["id"];
    const newTransactionID = lastId ? "t" + String(+lastId.slice(1) + 1) : "t1";
    const transaction = {
      ...values,
      id: newTransactionID,
    };
    return transaction;
  };
  function handleChange(fieldId: string, value: FormValue) {
    setFormValues((previous) => ({
      ...previous,
      [fieldId]: value,
    }));
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const transaction = createNewTransaction(formValues);
    dispatch(addTransaction(transaction as Transaction));
    onSubmitSuccess?.();
  }

  return (
    <form className="new-transaction-form" onSubmit={handleSubmit}>
      <TextInput
        id="merchant"
        label="Input merchant"
        required={true}
        placeholder="e.g. Trader Joe's"
        onChange={handleChange}
      />
      <NumberInput
        id="amount"
        label="Transaction amount"
        required={true}
        step="0.01"
        placeholder="0.00"
        onChange={handleChange}
      />
      <Select
        id="category"
        label="Select category"
        required={true}
        placeholder="Choose a category"
        options={options}
        onChange={handleChange}
      />
      <Datepicker
        id="date"
        label="Transaction date"
        required={true}
        onChange={handleChange}
      />
      <button className="form-submit-button" type="submit">
        Save Transaction
      </button>
    </form>
  );
}
