export const BlogSkeleton = () => {
  return (
    <>
      <div role="status" className="max-w-sm animate-pulse ml-72 mt-12">
        <div className="border-slate-400 border-b-2 pb-4 my-2 max-w-screen cursor-pointer">
          <div className="flex">
            <div className="flex justify-center flex-col">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            </div>
            <div className="font-extralight px-1 py-1">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            </div>
            <div className="flex justify-center flex-col pl-1">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            </div>
            <div className="font-extralight text-slate-400 px-1 py-1">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            </div>
          </div>
          <div className="text-xl font-bold pt-1 pl-1">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          </div>
          <div className="text-md font-thin pt-1 pl-1">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          </div>
          <div className="text-slate-400 text-xs py-1 pl-1">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};
