import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const expenseApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8080/api/v1",
	}),
	endpoints: (builder) => ({
		//get categories
		getCategories: builder.query({
			query: () => "/categories",
			providesTags: ["categories"],
		}),

		//get labels
		getLabels: builder.query({
			query: () => "/labels",
			providesTags: ["transaction"],
		}),

		//add new transaction
		addTransaction: builder.mutation({
			query: (initialTransaction) => ({
				url: "/transaction",
				method: "POST",
				body: initialTransaction,
			}),
			invalidatesTags: ["transaction"],
		}),

		//delete transaction
		deleteTransaction: builder.mutation({
			query: (transactionID) => ({
				url: "/transaction",
				method: "DELETE",
				body: transactionID,
			}),
			invalidatesTags: ["transaction"],
		}),
	}),
});

export const {
	useGetCategoriesQuery,
	useGetLabelsQuery,
	useAddTransactionMutation,
	useDeleteTransactionMutation,
} = expenseApi;
