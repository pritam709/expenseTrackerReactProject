import { createSlice } from "@reduxjs/toolkit";

const initialState = { expenseList: [], totalExpense: 0 };

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenseListNull(state) {
      state.expenseList = [];
    },
    onRestoreExpenses(state, action) {
      state.expenseList = action.payload;
    },
    addExpense(state, action) {
      state.expenseList = [action.payload, ...state.expenseList];
    },
  
    removeExpense(state, action) {

        state.expenseList = state.expenseList.filter((item) => item.id !== action.payload.id);
        // console.log(state.expenseList);
     
    },
    totalExpenses(state) {
      const expenseList = [...state.expenseList];
      state.totalExpense = expenseList.reduce(
        (totalExp, newExp) => Number(totalExp) + Number(newExp.expenseAmount),
        0
      );
      // console.log("aaa", state.totalExpense);
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
