import { cn } from "@/lib/utils";
import { useGetSingleBookQuery } from "@/redux/api/baseApi";
import { useParams } from "react-router";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetSingleBookQuery(id);
  if (isLoading) return <p>loading...</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 px-6 xl:px-0">
      <figure className="border border-black p-6 lg:w-[30%] rounded-lg bg-white dark:bg-gray-900">
        <img
          src={data?.data?.image}
          alt={data?.data?.title}
          className="w-full h-[400px] rounded-lg object-fill"
        />
      </figure>
      {/* content */}
      <div className="text-black space-y-5 lg:space-y-6 lg:w-[60%] flex flex-col">
        <h2 className="text-3xl lg:text-5xl font-black text-center lg:text-start dark:text-white">
          {data?.data?.title}
        </h2>
        <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 text-balance text-center lg:text-start">
          {data?.data?.description}
        </p>
        <div className="bg-white dark:bg-gray-900 grid lg:grid-cols-2 gap-5 text-lg lg:text-xl p-4 lg:p-8 rounded-lg mt-auto">
          <p className="capitalize dark:text-white">
            <span className="font-semibold">author:</span> {data?.data.author}
          </p>
          <p className="capitalize dark:text-white">
            <span className="font-semibold">genre:</span> {data?.data.genre}
          </p>
          <p className=" capitalize dark:text-white">
            <span className="font-semibold">Isbn:</span> {data?.data.isbn}
          </p>
          <p className="capitalize dark:text-white">
            <span className="font-semibold">Copies:</span> {data?.data.copies}
          </p>
          <p
            className={cn("font-black", {
              "text-red-600": !data.available,
              "text-green-300": data.available,
            })}
          >
            {data?.data.available ? "Available" : "Unavailable"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
