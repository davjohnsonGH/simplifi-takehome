import { useMemo } from "react";
import type { Transaction, TransactionCategory } from "../types";

interface UseVisibleTransactionsParams {
  transactions: Transaction[];
  selectedCategories: TransactionCategory[];
}

export function useVisibleTransactions({
  transactions,
  selectedCategories,
}: UseVisibleTransactionsParams) {
  return useMemo(() => {
    if (selectedCategories.length === 0) {
      return transactions;
    }

    return transactions.filter((transaction) =>
      selectedCategories.includes(transaction.category),
    );
  }, [transactions, selectedCategories]);
}