import { createBrowserRouter } from "react-router";
import Layout from "../App";
import AllBooks from "@/pages/all-books/AllBooks";
import AddBook from "@/pages/add-book/AddBook";
import BorrowSummary from "@/pages/borrow-summary/BorrowSummary";
import BookDetails from "../pages/book-details/BookDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <AllBooks />,
      },
      {
        path: "/",
        element: <AllBooks />,
      },
      {
        path: "/all-books",
        element: <AllBooks />,
      },
      {
        path: "/all-books/:id",
        element: <BookDetails />,
      },
      {
        path: "/add-book",
        element: <AddBook />,
      },
      {
        path: "/borrow-summary",
        element: <BorrowSummary />,
      },
    ],
  },
]);
