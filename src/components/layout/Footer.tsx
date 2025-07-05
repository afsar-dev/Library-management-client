import { ImLibrary } from "react-icons/im";
import { Link } from "react-router";

const Footer = () => {
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
    <footer className="bg-white border border-black shadow-[4px_4px_0_black] xl:rounded-lg dark:bg-gray-900 mt-auto container xl:mb-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to={"/"} className="flex items-center gap-1 text-purple-500 ">
            <ImLibrary className="text-xl mb-0.5" />
            <span className="font-semibold text-2xl">Libra</span>
          </Link>
          <ul className="hidden md:flex flex-wrap items-center mb-6 text-sm font-medium text-purple-500 sm:mb-0">
            {links.map((link) => {
              return (
                <Link
                  key={link.path}
                  className={`hover:underline me-4 md:me-6`}
                  to={link.path}
                >
                  {link.text}
                </Link>
              );
            })}
          </ul>
        </div>
        <hr className="my-6 border-dashed border-purple-500 sm:mx-auto  lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400 font-bold">
          © 2025 Libra. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
