import { useState } from "react";
import { DayGroup } from "./components/DayGroup";
import { groupByDay } from "./utils/transactions";
import { useAppSelector } from "./app/hooks";
import Modal from "./components/Modal";
import NewTransactionForm from "./components/NewTransactionForm";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const transactions = useAppSelector((state) => state.transactions.items);
  const grouped = groupByDay(transactions);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Transactions</h1>
        <p className="subtitle">Last 7 days</p>
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
          <NewTransactionForm temp="hello world" />
        </Modal>
        {grouped.map(({ date, transactions: dayTransactions }) => (
          <DayGroup key={date} date={date} transactions={dayTransactions} />
        ))}
      </main>
    </div>
  );
}
