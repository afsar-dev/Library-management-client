import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddBookMutation } from "@/redux/api/baseApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AddBook = () => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dbrceqag4";
  const [loading, setLoading] = useState(false);
  const [addBook] = useAddBookMutation();
  const navigate = useNavigate();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const available = formData.get("available") === "Yes";

    const fileInput = form.image as HTMLInputElement;
    const image = fileInput?.files?.[0];

    let imageUrl;
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
        const imgData = await res.json();
        imageUrl = imgData.secure_url;
      } catch (error) {
        console.error("Image upload failed:", error);
        return;
      }
    }

    const bookData = {
      ...data,
      available,
      copies: Number(data.copies),
      image: imageUrl,
    };

    const result = await addBook(bookData).unwrap();
    if (result) {
      setLoading(false);
      toast.success("Book added successfully!");
      navigate("/all-books", { replace: true });
    }
  };

  const selectClasses =
    "w-full h-9 px-1.5 flex items-center dark:bg-[#272930] rounded-md border border-black overflow-hidden shadow-[2px_2px_0_black] transition hover:shadow-[1px_1px_0_black] text-purple-500 focus:ring-black focus:border-black cursor-pointer";

  const renderInputField = ({ label, name, type }: (typeof inputFields)[0]) => {
    if (name === "genre") {
      return (
        <select name="genre" className={selectClasses}>
          <option disabled>Available</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      );
    }

    if (name === "available") {
      return (
        <select name="available" className={selectClasses} defaultValue={"Yes"}>
          <option disabled>Available</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      );
    }

    if (type === "file") {
      return (
        <Input
          id={name}
          name={name}
          type="file"
          className="border border-black shadow-[2px_2px_0_black] text-purple-500"
        />
      );
    }

    return (
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="border border-black shadow-[2px_2px_0_black] placeholder:text-purple-500"
      />
    );
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="grid grid-cols-2 gap-4 md:gap-6 px-4 md:px-8 xl:px-0"
    >
      {inputFields
        .filter((field) => field.name !== "genre" && field.name !== "available")
        .map((field) => (
          <div key={field.name} className="space-y-2">
            <Label
              htmlFor={field.name}
              className="text-purple-500 font-semibold"
            >
              {field.label}
            </Label>
            {renderInputField(field)}
          </div>
        ))}

      <div className="space-y-2">
        <Label className="text-purple-500 font-semibold">
          Genre & Available
        </Label>
        <div className="flex gap-4">
          {renderInputField({ label: "Genre", name: "genre", type: "text" })}

          {renderInputField({
            label: "Available",
            name: "available",
            type: "checkbox",
          })}
        </div>
      </div>

      <div className="space-y-2 col-span-2">
        <Label htmlFor="description" className="text-purple-500 font-semibold">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter book description"
          className="border border-black shadow-[2px_2px_0_black] placeholder:text-purple-500 h-24"
        />
      </div>

      <Button
        className="col-span-2 bg-purple-500 cursor-pointer rounded hover:bg-purple-400 text-black shadow-[4px_4px_0_black] border border-black"
        type="submit"
      >
        {loading ? <Spinner width="40" color="#fff" /> : "Submit"}
      </Button>
    </form>
  );
};

export default AddBook;

const inputFields = [
  { label: "Image", name: "image", type: "file" },
  { label: "Title", name: "title", type: "text" },
  { label: "Author", name: "author", type: "text" },
  { label: "Genre", name: "genre", type: "text" },
  { label: "ISBN", name: "isbn", type: "text" },
  { label: "Copies", name: "copies", type: "number" },
  { label: "Available", name: "available", type: "checkbox" },
];

const genres = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];
