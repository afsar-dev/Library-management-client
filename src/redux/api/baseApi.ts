import type { IBook } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type UpdateBookArg = Partial<IBook> & { id: string };

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:4000/api` }),
  tagTypes: ["book"],
  endpoints: (build) => ({
    // get all books
    getAllBooks: build.query<{ data: IBook[] }, void>({
      query: () => `/books`,
      providesTags: ["book"],
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
    deleteBook: build.mutation<string, string>({
      query: (id) => ({
        url: `/delete-book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = baseApi;
