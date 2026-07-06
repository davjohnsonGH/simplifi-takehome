import { useState } from "react";
import type { Transaction } from "../types";
import { formatCurrency } from "../utils/format";
import { useAppDispatch } from "../app/hooks";
import { deleteTransaction } from "../features/transactions/transactionsSlice";

import Modal from "./Modal";

interface Props {
  transaction: Transaction;
}
interface DeleteTransactionProps {
  deleteTransaction: boolean;
}

export function TransactionRow({ transaction }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { merchant, category, amount } = transaction;
  const isCredit = amount > 0;
  const amountClass = isCredit ? "amount-credit" : "amount-debit";
  const dispatch = useAppDispatch();

  function deletTransactionClick() {
    dispatch(deleteTransaction(transaction.id));
  }
  function TransactionEl({ deleteTransaction }: DeleteTransactionProps) {
    return (
      <>
        <div className="transaction-main">
          <span className="transaction-merchant">{merchant}</span>
          <span className="transaction-category">{category}</span>
        </div>
        <span className={`transaction-amount ${amountClass}`}>
          {isCredit ? "+" : ""}
          {formatCurrency(Math.abs(amount))}
        </span>
        {deleteTransaction && (
          <button onClick={deletTransactionClick}>delete</button>
        )}
      </>
    );
  }

  return (
    <li className="transaction-row">
      <TransactionEl deleteTransaction={false} />
      <button
        id="delete-transaction-button"
        onClick={() => setIsModalOpen(true)}
      >
        delete
      </button>
      <Modal
        id="new-transaction-modal"
        title="Delete Transaction"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <li className="transaction-row">
          <TransactionEl deleteTransaction={true} />
        </li>
      </Modal>
    </li>
  );
}
