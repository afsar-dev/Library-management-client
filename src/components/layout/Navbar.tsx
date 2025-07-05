import { Link, NavLink } from "react-router";
import { ModeToggle } from "../mode-toggle";
import { ImLibrary } from "react-icons/im";
import DrawerOpen from "../DrawerOpen";

export default function Nav() {
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
    <div className="sticky md:top-5 left-0 z-50 w-full">
      <nav className="text-purple-500 shadow-[4px_4px_0_black] md:rounded-md bg-white dark:bg-gray-900 mx-auto flex items-center justify-between gap-x-10 w-full md:w-max gap-5 border-black border p-2.5 px-5 text-sm sm:text-base">
        <Link to={"/"}>
          <ImLibrary className="text-purple-500 text-xl" />
        </Link>
        <div className="hidden md:flex items-center gap-4 text-sm">
          {links.map((link) => {
            return (
              <NavLink
                key={link.path}
                className={({ isActive }) =>
                  isActive ? "active-link" : "inactive-link"
                }
                to={link.path}
              >
                {link.text}
              </NavLink>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <DrawerOpen />
        </div>
      </nav>
    </div>
  );
}
