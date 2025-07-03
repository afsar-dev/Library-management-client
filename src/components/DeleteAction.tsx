import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export const DeleteAction = ({ id }: { id: string }) => {
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id).unwrap();
      toast.success("Book deleted successfully");
    } catch {
      toast.error("Failed to delete book");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex justify-center w-full p-1 bg-white text-black font-medium border border-black rounded shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] transition cursor-pointer">
          <Trash2 size={16} className="text-red-500" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-2 border-black shadow-[5px_5px_0_black]">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Book?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this book? This action is permanent
            and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white cursor-pointer rounded hover:bg-white/60 text-black dark:text-white shadow-[4px_4px_0_black] border border-black">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(id)}
            className="bg-purple-500 cursor-pointer rounded hover:bg-purple-400 text-black shadow-[4px_4px_0_black] border border-black"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
