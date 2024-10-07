const LoadingCard = () => {
  return (
    <div>
      <article className="mb-4 break-inside p-4 md:p-6 rounded-xl bg-white flex flex-col bg-clip-border md:w-11/12 lg:w-10/12 xl:w-[75%] mx-auto border border-secondary animate-pulse">
        <div className="flex pb-6 items-center justify-between">
          <div className="flex">
            <div className="mr-4">
              <div className="rounded-full bg-gray-300 w-12 h-12 animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <div className="bg-gray-300 rounded-md w-3/4 h-4 mb-2 animate-pulse"></div>
              <div className="bg-gray-300 rounded-md w-1/2 h-4 animate-pulse"></div>
            </div>
            <div className="ml-3 md:ml-4">
              <div className="bg-gray-300 rounded-full w-20 h-8 animate-pulse"></div>
            </div>
          </div>
          <div>
            <div className="bg-gray-300 rounded-full w-20 h-8 animate-pulse hidden md:block mb-2"></div>
          </div>
        </div>
        <div className="mt-2 mb-6 md:mb-0 md:mt-0">
          <div className="bg-gray-300 rounded-full w-20 h-8 animate-pulse md:hidden mb-2"></div>
        </div>
        <div className="bg-gray-300 rounded-md w-full h-6 mb-4 animate-pulse"></div>
        <div className="py-4">
          <div className="bg-gray-300 rounded-md w-full h-[450px] animate-pulse"></div>
        </div>
        <div className="bg-gray-300 rounded-md w-full h-6 mb-4 animate-pulse"></div>
        <div className="py-4 flex gap-5">
          <div className="inline-flex items-center">
            <div className="bg-gray-300 rounded-full w-8 h-8 animate-pulse mr-2"></div>
            <div className="bg-gray-300 rounded-md w-12 h-6 animate-pulse"></div>
          </div>
          <div className="inline-flex items-center">
            <div className="bg-gray-300 rounded-full w-8 h-8 animate-pulse mr-2"></div>
            <div className="bg-gray-300 rounded-md w-12 h-6 animate-pulse"></div>
          </div>
          <div className="inline-flex items-center">
            <div className="bg-gray-300 rounded-full w-8 h-8 animate-pulse mr-2"></div>
            <div className="bg-gray-300 rounded-md w-12 h-6 animate-pulse"></div>
          </div>
        </div>
        <div className="relative">
          <div className="bg-gray-300 rounded-md w-full h-10 animate-pulse"></div>
        </div>
      </article>
    </div>
  );
};

export default LoadingCard;
