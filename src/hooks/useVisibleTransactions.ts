import { useMemo } from "react";
import type { Transaction, TransactionCategory } from "../types";

interface UseVisibleTransactionsParams {
  transactions: Transaction[];
  selectedCategories: TransactionCategory[];
  selectedMerchants: string;
}

export function useVisibleTransactions({
  transactions,
  selectedCategories,
  selectedMerchants,
}: UseVisibleTransactionsParams) {
  return useMemo(() => {
    // if no search or filter
    if (selectedCategories.length === 0 && selectedMerchants.length === 0) {
      return transactions;
    }
    // if search and filter
   if (selectedCategories.length > 0 && selectedMerchants.length > 0) {
      const filteredTransactions = transactions.filter((transaction) =>
        selectedCategories.includes(transaction.category),
      );
      return filteredTransactions.filter((transaction) =>
        transaction.merchant.toLowerCase().includes(selectedMerchants.toLowerCase())
      );

    }
    // if filter and no search
    if (selectedCategories.length > 0 && selectedMerchants.length === 0) {
      return transactions.filter((transaction) =>
        selectedCategories.includes(transaction.category),
      );
    }
    // if search and no filter
   if (selectedCategories.length === 0 && selectedMerchants.length > 0) {
      return transactions.filter((transaction) =>
        transaction.merchant.toLowerCase().includes(selectedMerchants.toLowerCase())
      );
    }
    return transactions;


  }, [transactions, selectedCategories, selectedMerchants]);
}
