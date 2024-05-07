	import { configureStore } from "@reduxjs/toolkit";
	import expenseSlice from "../features/expenseTracker/expenseSlice";
	import { expenseApi } from "../services/expenseAPI";
	import { setupListeners } from "@reduxjs/toolkit/query";

	export const store = configureStore({
		reducer: {
			expense: expenseSlice,
			[expenseApi.reducerPath]: expenseApi.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(expenseApi.middleware),
	});

	setupListeners(store.dispatch);
