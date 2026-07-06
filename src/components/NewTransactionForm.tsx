import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addTransaction } from "../features/transactions/transactionsSlice";
import {
  TRANSACTION_CATEGORIES,
  type Transaction,
  type TransactionCategory,
} from "../types";
import Datepicker from "./Datepicker";
import NumberInput from "./NumberInput";
import TextInput from "./TextInput";
import Select from "./Select";
import type { FormComponentValue } from "./types";

type NewTransactionFormValues = {
  merchant: string;
  amount: number;
  category: string;
  date: string;
};

type FormFieldId = keyof NewTransactionFormValues;
type FormErrors = Partial<Record<FormFieldId, string>>;
type NewTransactionInput = Omit<Transaction, "id">;

type ValidationResult =
  | { ok: true; value: NewTransactionInput }
  | { ok: false; errors: FormErrors };

type NewTransactionFormProps = {
  onSubmitSuccess?: () => void;
};

function isTransactionCategory(value: string): value is TransactionCategory {
  return (TRANSACTION_CATEGORIES as readonly string[]).includes(value);
}

function validateAndParse(values: NewTransactionFormValues): ValidationResult {
  const errors: FormErrors = {};

  const merchant = values.merchant.trim();
  if (!merchant) {
    errors.merchant = "Merchant is required.";
  }

  const amount = values.amount;
  if (!Number.isFinite(amount)) {
    errors.amount = "Amount must be a valid number.";
  }

  const category = values.category.trim();
  if (!isTransactionCategory(category)) {
    errors.category = "Please select a valid category.";
  }

  const date = values.date.trim();
  if (!date) {
    errors.date = "Date is required.";
  } else if (Number.isNaN(Date.parse(date))) {
    errors.date = "Date is invalid.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      merchant,
      amount,
      category,
      date,
    },
  };
}

function getNextTransactionId(transactions: Transaction[]): string {
  const lastId = transactions[transactions.length - 1]?.id;
  if (!lastId) return "t1";

  const numericPart = Number(lastId.slice(1));
  if (!Number.isFinite(numericPart)) return "t1";

  return "t" + String(numericPart + 1);
}

export default function NewTransactionForm({
  onSubmitSuccess,
}: NewTransactionFormProps) {
  const [formValues, setFormValues] = useState<NewTransactionFormValues>({
    merchant: "",
    amount: 0,
    category: "",
    date: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) => state.transactions.items);

  const options = TRANSACTION_CATEGORIES.map((category) => ({
    label: category,
    value: category,
  }));

  function handleChange(fieldId: string, value: FormComponentValue) {
    switch (fieldId as FormFieldId) {
      case "merchant":
        if (typeof value === "string") {
          setFormValues((prev) => ({ ...prev, merchant: value }));
        }
        break;
      case "amount":
        if (typeof value === "number") {
          setFormValues((prev) => ({ ...prev, amount: value }));
        }
        break;
      case "category":
        if (typeof value === "string") {
          setFormValues((prev) => ({ ...prev, category: value }));
        }
        break;
      case "date":
        if (typeof value === "string") {
          setFormValues((prev) => ({ ...prev, date: value }));
        }
        break;
      default:
        break;
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = validateAndParse(formValues);
    console.log(result);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }

    const transaction: Transaction = {
      ...result.value,
      id: getNextTransactionId(transactions),
    };

    dispatch(addTransaction(transaction));
    setErrors({});
    onSubmitSuccess?.();
  }

  return (
    <form className="new-transaction-form" onSubmit={handleSubmit} noValidate>
      <TextInput
        id="merchant"
        label="Input merchant"
        required={true}
        placeholder="e.g. Trader Joe's"
        onChange={handleChange}
      />
      {errors.merchant && <p className="form-error">{errors.merchant}</p>}

      <NumberInput
        id="amount"
        label="Transaction amount"
        required={true}
        step="0.01"
        placeholder="0.00"
        onChange={handleChange}
      />
      {errors.amount && <p className="form-error">{errors.amount}</p>}

      <Select
        id="category"
        label="Select category"
        required={true}
        placeholder="Choose a category"
        options={options}
        onChange={handleChange}
      />
      {errors.category && <p className="form-error">{errors.category}</p>}

      <Datepicker
        id="date"
        label="Transaction date"
        required={true}
        onChange={handleChange}
      />
      {errors.date && <p className="form-error">{errors.date}</p>}

      <button className="form-submit-button" type="submit">
        Save Transaction
      </button>
    </form>
  );
}
