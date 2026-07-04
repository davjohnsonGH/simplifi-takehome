import { createSlice } from "@reduxjs/toolkit";
import type { Transaction } from "../../types";
import { transactions } from "../../data/transactions";

// TODO: fill out reducers, export reducers and actions
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
    addTransaction: (state) => state,
    deleteTransaction: (state) => state,
  },
});

export default transactionsSlice.reducer;
