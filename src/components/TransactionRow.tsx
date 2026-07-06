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
// AI GENERATED START ********
function TrashIcon() {
  return (
    <svg
      className="trash-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M10 3H14M4 7H20M18 7L17.3 18.2C17.2 19.1 16.5 19.8 15.6 19.8H8.4C7.5 19.8 6.8 19.1 6.7 18.2L6 7M10 11V16M14 11V16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
// AI GENERATED END ********

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

        <div className="transaction-actions">
          <span className={`transaction-amount ${amountClass}`}>
            {isCredit ? "+" : ""}
            {formatCurrency(Math.abs(amount))}
          </span>

          {deleteTransaction && (
            <button
              className="transaction-delete-button transaction-delete-button-danger"
              type="button"
              onClick={deletTransactionClick}
            >
              <TrashIcon />
              <span>Delete</span>
            </button>
          )}
        </div>
      </>
    );
  }

  return (
    <li className="transaction-row">
      <TransactionEl deleteTransaction={false} />
      <button
        className="transaction-icon-button"
        type="button"
        aria-label={`Delete transaction for ${merchant}`}
        title="Delete transaction"
        onClick={() => setIsModalOpen(true)}
      >
        <TrashIcon />
      </button>
      <Modal
        id="new-transaction-modal"
        title="Delete Transaction"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="transaction-row transaction-row-modal">
          <TransactionEl deleteTransaction={true} />
        </div>
      </Modal>
    </li>
  );
}
