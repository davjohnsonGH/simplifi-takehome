import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Transaction } from "../../types";
import { transactions } from "../../data/transactions";

type TransactionsState = {
  items: Transaction[];
};

const initialState: TransactionsState = {
  items: [...transactions],
};
const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.items.push(action.payload);
    },
    deleteTransaction(state, action: PayloadAction<Transaction["id"]>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addTransaction, deleteTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
