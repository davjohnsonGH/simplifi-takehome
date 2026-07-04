import { DayGroup } from "./components/DayGroup";
import { groupByDay } from "./utils/transactions";
import { useAppSelector } from "./app/hooks";

export default function App() {
  const transactions = useAppSelector((state) => state.transactions.items);
  const grouped = groupByDay(transactions);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Transactions</h1>
        <p className="subtitle">Last 7 days</p>
      </header>
      <main className="app-main">
        {grouped.map(({ date, transactions: dayTransactions }) => (
          <DayGroup key={date} date={date} transactions={dayTransactions} />
        ))}
      </main>
    </div>
  );
}
