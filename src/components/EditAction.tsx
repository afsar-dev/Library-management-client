import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import type { IBook } from "@/types/types";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { useUpdateBookMutation } from "@/redux/api/baseApi";
import toast from "react-hot-toast";

interface IProps {
  book: IBook;
}

const EditAction: React.FC<IProps> = ({ book }) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dbrceqag4";
  const [updateBook] = useUpdateBookMutation();

  const [selectedImageName, setSelectedImageName] = useState<string | null>(
    null
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    book.image || null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const available = formData.get("available") !== null;
    const fileInput = form.image as HTMLInputElement;
    const image = fileInput.files?.[0];

    let imageUrl = book.image;
    if (image) {
      const imageFormData = new FormData();
      imageFormData.append("file", image);
      imageFormData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "Image_gallery"
      );

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: imageFormData,
          }
        );

        const data = await res.json();
        imageUrl = data.secure_url;
      } catch (error) {
        console.error("Image upload failed:", error);
        return;
      }
    }

    const updatedBookData = {
      ...data,
      available,
      copies: Number(data.copies),
      image: imageUrl,
    };

    const result = await updateBook({
      id: book._id,
      ...updatedBookData,
    }).unwrap();

    if (result) {
      toast.success("Book updated successfully!");
      form.reset();
      formRef.current?.reset();
      setPreviewUrl(book.image || null);
      setSelectedImageName(null);
      setIsModalOpen(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <button className="flex justify-center w-full p-1 bg-white text-black font-medium border border-black rounded shadow-[3px_3px_0_black] hover:shadow-[1px_1px_0_black] transition cursor-pointer">
          <Pencil size={16} className="text-orange-500" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border border-black shadow-[5px_5px_0_black]">
        <form onSubmit={handleOnSubmit}>
          <DialogHeader className="sr-only">
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-5">
            {inputData.map(({ label, name, type }) => (
              <div key={name} className="space-y-2">
                <Label htmlFor={name} className="text-purple-500 font-semibold">
                  {label}
                </Label>
                {name === "available" ? (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={name}
                      name={name}
                      defaultChecked={book.available}
                    />
                    <span
                      className={cn("text-sm", {
                        "text-red-500": !book.available,
                        "text-green-500": book.available,
                      })}
                    >
                      {book.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                ) : type === "file" ? (
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1 truncate">
                      Selected:{" "}
                      {previewUrl?.split("").slice(0, 40).join("") ||
                        selectedImageName}
                      ......
                    </p>
                    <Input
                      id={name}
                      name={name}
                      type="file"
                      className="border border-black shadow-[2px_2px_0_black] placeholder:text-purple-400"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSelectedImageName(file.name);
                          setPreviewUrl(URL.createObjectURL(file));
                        } else {
                          setSelectedImageName(null);
                          setPreviewUrl(book.image || null);
                        }
                      }}
                    />
                  </div>
                ) : (
                  <Input
                    id={name}
                    name={name}
                    type={type}
                    defaultValue={String(book[name as keyof IBook])}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    className="border border-black shadow-[2px_2px_0_black] placeholder:text-purple-400"
                  />
                )}
              </div>
            ))}
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-purple-500 font-semibold"
              >
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter book description"
                defaultValue={book?.description}
                className="border border-black shadow-[2px_2px_0_black] placeholder:text-purple-400 min-h-28"
              />
            </div>
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

export default EditAction;

const inputData = [
  { label: "Image", name: "image", type: "file" },
  { label: "Title", name: "title", type: "text" },
  { label: "Author", name: "author", type: "text" },
  { label: "Genre", name: "genre", type: "text" },
  { label: "ISBN", name: "isbn", type: "text" },
  { label: "Copies", name: "copies", type: "number" },
  { label: "Available", name: "available", type: "checkbox" },
];