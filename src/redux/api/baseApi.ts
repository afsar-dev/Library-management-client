import type { IBook } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type UpdateBookArg = Partial<IBook> & { id: string };

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://library-management-server-one-eta.vercel.app/api`,
  }),
  tagTypes: ["book"],
  endpoints: (build) => ({
    // get all books
    getAllBooks: build.query<{ data: IBook[] }, void>({
      query: () => `/books`,
      providesTags: ["book"],
    }),
    // get single book
    getSingleBook: build.query({
      query: (id) => `/books/${id}`,
    }),
    // add a book
    addBook: build.mutation({
      query: (bookBody) => ({
        url: `/create-book`,
        method: "POST",
        body: bookBody,
      }),
      invalidatesTags: ["book"],
    }),
    // update a book
    updateBook: build.mutation<IBook, UpdateBookArg>({
      query: ({ id, ...patch }) => ({
        url: `/edit-book/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["book"],
    }),
    // delete a book
    deleteBook: build.mutation<string, string>({
      query: (id) => ({
        url: `/delete-book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),
    // borrow a book
    borrowBook: build.mutation({
      query: (borrowData) => ({
        url: `/borrow/${borrowData?.bookId}`,
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["book"],
    }),
    // borrow summary
    getBorrowSummary: build.query({
      query: () => `/borrow-summary`,
      providesTags: ["book"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetSingleBookQuery,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = baseApi;
