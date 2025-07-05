import type { IBook } from "@/types/types";
import type React from "react";
import EditAction from "../EditAction";
import { cn } from "@/lib/utils";
import { DeleteAction } from "../DeleteAction";
import { Link } from "react-router";
import BorrowAction from "../BorrowAction";

interface IProps {
  book: IBook;
}

export const Card: React.FC<IProps> = ({ book }) => {
  return (
    <div className="rounded-lg border border-black bg-purple-400 shadow-[6px_6px_0_black] transition hover:shadow-[1px_1px_0_black] cursor-pointer">
      {/* book image */}
      <figure>
        <img
          src={book?.image}
          alt={book?.title}
          className="w-full h-48 rounded-t-lg object-fill"
        />
      </figure>
      <div className="p-3">
        {/* content */}
        <div className="text-black space-y-0.5">
          <h2 className="text-lg font-black line-clamp-1 truncate">
            {book?.title}
          </h2>
          <p className="capitalize">
            <span className="font-semibold">author:</span> {book?.author}
          </p>
          <p className="capitalize">
            <span className="font-semibold">genre:</span> {book?.genre}
          </p>
          <p className=" capitalize">
            <span className="font-semibold">Isbn:</span> {book?.isbn}
          </p>
          <div className="flex items-center justify-between">
            <p className="capitalize">
              <span className="font-semibold">Copies:</span> {book?.copies}
            </p>
            <p
              className={cn("font-black", {
                "text-red-600": !book.available,
                "text-green-300": book.available,
              })}
            >
              {book.available ? "Available" : "Unavailable"}
            </p>{" "}
          </div>
        </div>
        {/* actions */}
        <div className="mt-4 flex items-center justify-between">
          {/* edit and delete */}
          <div className="flex items-center gap-2">
            <EditAction book={book} />
            <DeleteAction id={book?._id} />
          </div>
          {/* details and borrow */}
          <div className="flex items-center gap-2">
            <BorrowAction book={book} />
            <Link
              to={`/all-books/${book._id}`}
              className="flex justify-center w-full py-1 px-2 bg-blue-700 text-white font-medium border border-black rounded shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] transition cursor-pointer"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
