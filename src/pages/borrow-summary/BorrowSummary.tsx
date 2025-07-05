import Spinner from "@/components/Spinner";
import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";
import type { ISummary } from "@/types/types";

const BorrowSummary = () => {
  const { data, isLoading, error } = useGetBorrowSummaryQuery(undefined);
  console.log({ data, error });

  const borrowedSummary = data?.data ?? [];

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center py-24">
          <Spinner />
        </div>
      ) : error ? (
        <p className="text-center text-red-500">Failed to load books.</p>
      ) : borrowedSummary.length === 0 ? (
        <p className="text-center text-purple-500">No books found.</p>
      ) : (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-black md:uppercase bg-purple-400 dark:bg-gray-900 dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  ISBN
                </th>
              </tr>
            </thead>
            <tbody>
              {borrowedSummary?.map((summary: ISummary) => (
                <tr
                  key={summary?.book?.isbn}
                  className="bg-white border-b text-xs md:text-sm dark:bg-gray-800 dark:border-purple-500 border-purple-500"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {summary?.book?.title}
                  </th>
                  <td className="px-6 py-4">{summary?.totalQuantity}</td>
                  <td className="px-6 py-4">{summary?.book?.isbn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default BorrowSummary;
