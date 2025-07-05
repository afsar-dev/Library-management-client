import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useBorrowBookMutation } from "@/redux/api/baseApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import type { IBook } from "@/types/types";

interface APIError {
  status: number;
  data: {
    message: string;
  };
}

const BorrowAction = ({ book }: { book: IBook }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [borrowBook] = useBorrowBookMutation();
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (Number(book?.copies) === 0) {
      return toast.error("Copies not available");
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const dueDate = new Date(data?.dueDate as string).toISOString();
      const borrowData = {
        bookId: book?._id,
        quantity: Number(data?.quantity),
        dueDate,
      };
      const result = await borrowBook(borrowData).unwrap();
      if (result?.success) {
        toast.success(result.message);
        setIsModalOpen(false);
        navigate("/borrow-summary");
      }
    } catch (error) {
      const err = error as APIError;
      toast.error(err?.data?.message || "Something went wrong.");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <button
        onClick={handleOnClick}
        className="flex justify-center w-full py-1 px-2 bg-green-500 hover:bg-green-400 text-white font-medium border border-black rounded shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] transition cursor-pointer"
      >
        Borrow
      </button>
      <DialogContent className="sm:max-w-[425px] border border-black shadow-[5px_5px_0_black]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="sr-only">
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-5">
            {inputFields?.map((data) => (
              <div key={data?.label} className="space-y-2">
                <Label className="text-purple-500 font-semibold">
                  {data?.label}
                </Label>
                <Input
                  min={0}
                  id={data?.name}
                  name={data?.name}
                  type={data?.type}
                  placeholder={`Enter ${data?.label.toLowerCase()}`}
                  className="border border-black shadow-[2px_2px_0_black] placeholder:text-purple-400 text-purple-500"
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              className="w-full bg-purple-500 cursor-pointer rounded hover:bg-purple-400 text-black shadow-[4px_4px_0_black] border border-black"
              type="submit"
            >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowAction;

const inputFields = [
  { label: "Quantity", name: "quantity", type: "number" },
  { label: " Due Date", name: "dueDate", type: "date" },
];
