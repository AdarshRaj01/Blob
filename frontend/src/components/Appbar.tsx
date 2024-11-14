import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
  return (
    <div className="flex flex-row justify-between px-10 border-b py-3">
      <Link to={"/blogs"}>
        <div className="flex justify-center cursor-pointer py-2 font-medium text-lg">Blogbi</div>
      </Link>
      <Link to={"/publish"}>
        <button
          type="button"
          className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 ml-[1100px]"
        >
          New Blog
        </button>
      </Link>

      <div className="p-2">
        <Avatar authorName="Adarsh" />
      </div>
    </div>
  );
};
