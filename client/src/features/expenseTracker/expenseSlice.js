import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	categories: [],
	transaction: [],
};

export const expenseSlice = createSlice({
	name: "expense",
	initialState,
	reducers: {
		getTransaction: (state) => {
			console.log(state);
		},
	},
});

export const { getTransaction } = expenseSlice.actions;
export default expenseSlice.reducer;
