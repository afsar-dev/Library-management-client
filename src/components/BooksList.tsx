import { useGetAllBooksQuery } from "@/redux/api/baseApi";
import { Card } from "./ui/card";
import type { IBook } from "@/types/types";
import { FiSearch, FiCamera } from "react-icons/fi";
import { useState } from "react";
import Spinner from "./Spinner";

const BooksList = () => {
  const { data, isLoading, error } = useGetAllBooksQuery();
  const [query, setQuery] = useState("");

  const books = data?.data ?? [];

  return (
    <div className="space-y-12">
      {/* search and sort */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-80 h-12 flex items-center bg-white dark:bg-gray-900 rounded-md border border-black overflow-hidden  shadow-[4px_4px_0_black] transition hover:shadow-[1px_1px_0_black] ">
          <button
            type="submit"
            className="px-2 bg-purple-500 h-12 text-white cursor-pointer"
          >
            <FiSearch size={20} />
          </button>

          <input
            type="text"
            placeholder="SEARCH..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-black dark:text-white placeholder-purple-400 px-2 py-2 outline-none w-full"
          />

          <button type="button" className="p-3 text-purple-500 cursor-pointer">
            <FiCamera size={20} />
          </button>
        </div>
        <select
          id="default"
          className="max-w-80 h-12 px-1.5 flex items-center bg-white dark:bg-gray-900 rounded-md border border-black overflow-hidden shadow-[4px_4px_0_black] transition hover:shadow-[1px_1px_0_black] text-purple-500 focus:ring-black focus:border-black cursor-pointer"
        >
          <option disabled>Sort by</option>
          <option value="Copies (Low to High)">Copies (Low to High)</option>
          <option value="Copies (high to Low)">Copies (high to Low)</option>
        </select>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-24">
          <Spinner />
        </div>
      ) : error ? (
        <p className="text-center text-red-500">Failed to load books.</p>
      ) : books.length === 0 ? (
        <p className="text-center text-purple-500">No books found.</p>
      ) : (
        <div className="grid md:grid-cols-4 gap-10 px-6 md:px-0">
          {books.map((book: IBook) => (
            <Card book={book} key={book._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksList;