import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AddBook = () => {
  return (
    <form className="space-y-4 py-5">
      <div className="grid grid-cols-2 gap-6">
        {inputFields.map(({ label, name, type }) => (
          <div key={name} className="space-y-2">
            <Label htmlFor={name} className="text-purple-500 font-semibold">
              {label}
            </Label>
            {name === "available" ? (
              <Checkbox id={name} name={name} defaultChecked={true} />
            ) : type === "file" ? (
              <div className="space-y-1">
                <Input
                  id={name}
                  name={name}
                  type="file"
                  className="border border-black shadow-[2px_2px_0_black] placeholder:text-purple-400"
                />
              </div>
            ) : (
              <Input
                id={name}
                name={name}
                type={type}
                placeholder={`Enter ${label.toLowerCase()}`}
                className="border border-black shadow-[2px_2px_0_black] placeholder:text-purple-400"
              />
            )}
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description" className="text-purple-500 font-semibold">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter book description"
          className="border border-black shadow-[2px_2px_0_black] placeholder:text-purple-400 min-h-28"
        />
      </div>
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
