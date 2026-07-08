import { useMemo } from "react";
import type { Transaction, TransactionCategory } from "../types";

interface UseVisibleTransactionsParams {
  transactions: Transaction[];
  selectedCategories: TransactionCategory[];
  selectedMerchants: string;
}

function matchesCategory(
  transaction: Transaction,
  selectedCategories: string[],
) {
  return selectedCategories.includes(transaction.category);
}

function matchesMerchant(transaction: Transaction, merchantSearch: string) {
  return transaction.merchant.toLowerCase().includes(merchantSearch);
}

export function useVisibleTransactions({
  transactions,
  selectedCategories,
  selectedMerchants,
}: UseVisibleTransactionsParams) {
  return useMemo(() => {
    const hasCategoryFilter = selectedCategories.length > 0;
    const hasMerchantFilter = selectedMerchants.length > 0;
    const merchantSearch = selectedMerchants.toLowerCase();

    if (!hasCategoryFilter && !hasMerchantFilter) {
      return transactions;
    }

    return transactions.filter((transaction) => {
      return (
        (!hasCategoryFilter ||
          matchesCategory(transaction, selectedCategories)) &&
        (!hasMerchantFilter || matchesMerchant(transaction, merchantSearch))
      );
    });
  }, [transactions, selectedCategories, selectedMerchants]);
}
