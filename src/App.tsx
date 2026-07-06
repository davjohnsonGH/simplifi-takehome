import { useState } from "react";
import { DayGroup } from "./components/DayGroup";
import { groupByDay } from "./utils/transactions";
import { useAppSelector } from "./app/hooks";
import Modal from "./components/Modal";
import NewTransactionForm from "./components/NewTransactionForm";

import FilterByCategory from "./components/FilterByCategory";
import type { TransactionCategory } from "./types";
import { useVisibleTransactions } from "./hooks/useVisibleTransactions";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<
    TransactionCategory[]
  >([]);
  const transactions = useAppSelector((state) => state.transactions.items);
  const visibleTransactions = useVisibleTransactions({
    transactions,
    selectedCategories,
  });
  const grouped = groupByDay(visibleTransactions);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Transactions</h1>
        <p className="subtitle">Last 7 days</p>
        <FilterByCategory onCategoriesChange={setSelectedCategories} />
        <button
          id="new-transaction-button"
          onClick={() => setIsModalOpen(true)}
        >
          New Transaction
        </button>
      </header>
      <main className="app-main">
        <Modal
          id="new-transaction-modal"
          title="Transaction Details"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <NewTransactionForm onSubmitSuccess={() => setIsModalOpen(false)} />
        </Modal>
        {grouped.map(({ date, transactions: dayTransactions }) => (
          <DayGroup key={date} date={date} transactions={dayTransactions} />
        ))}
      </main>
    </div>
  );
}
