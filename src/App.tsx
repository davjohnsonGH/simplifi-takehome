import { useState } from "react";
import { DayGroup } from "./components/DayGroup";
import { groupByDay } from "./utils/transactions";
import { useAppSelector } from "./app/hooks";
// new transaction and delete conformation
import Modal from "./components/Modal";
// new transaction
import NewTransactionForm from "./components/NewTransactionForm";
// filter
import FilterByCategory from "./components/FilterByCategory";
import type { TransactionCategory } from "./types";
import { useVisibleTransactions } from "./hooks/useVisibleTransactions";
// search
import SearchByMerchant from "./components/SearchByMerchant";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<
    TransactionCategory[]
  >([]);

  const [selectedMerchants, setSelectedMerchants] = useState<string>("");

  const transactions = useAppSelector((state) => state.transactions.items);
  const visibleTransactions = useVisibleTransactions({
    transactions,
    selectedCategories,
    selectedMerchants,
  });
  const grouped = groupByDay(visibleTransactions);

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-title-block">
          <h1>Transactions</h1>
          <p className="subtitle">Last 7 days</p>
        </div>
        <div className="app-header-controls">
          <SearchByMerchant onMerchantChange={setSelectedMerchants} />
          <FilterByCategory onCategoriesChange={setSelectedCategories} />
          <button
            className="new-transaction-button"
            id="new-transaction-button"
            onClick={() => setIsModalOpen(true)}
          >
            New Transaction
          </button>
        </div>
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
