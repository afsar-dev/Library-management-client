import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { IoIosMenu } from "react-icons/io";
import { NavLink } from "react-router";

const DrawerOpen = () => {
  const links = [
    {
      path: "/all-books",
      text: "All Books",
    },
    {
      path: "/add-book",
      text: "Add Book",
    },
    {
      path: "/borrow-summary",
      text: "Borrow Summary",
    },
  ];

  return (
    <Drawer>
      <DrawerTrigger className="border border-purple-500 p-1 rounded-md border-dashed block md:hidden ">
        <IoIosMenu className="text-2xl" />
      </DrawerTrigger>
      <DrawerContent className="bg-purple-500">
        <div className="flex flex-col gap-4 pl-6 py-10">
          <h2 className="text-purple-300 text-lg font-bold">Menu</h2>
          {links.map((link) => {
            return (
              <NavLink
                key={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-xl hover:underline text-black cursor-pointer font-black"
                    : "text-xl hover:underline text-white cursor-pointer font-medium"
                }
                to={link.path}
              >
                {link.text}
              </NavLink>
            );
          })}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerOpen;
