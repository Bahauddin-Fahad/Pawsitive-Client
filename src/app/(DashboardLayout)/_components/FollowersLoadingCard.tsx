const FollowersLoadingCard = () => {
  return (
    <div className="relative xl:w-[320px] mx-auto mt-24 break-words bg-gray-200 mb-6 shadow-lg rounded-xl border animate-pulse">
      <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="w-full flex justify-center">
            <div className="relative">
              <div className="shadow-xl align-middle border-none w-[150px] h-[150px] rounded-full bg-slate-200 absolute -top-16 -right-[80px]" />
            </div>
          </div>
          <div className="w-full text-center mt-20">
            <div className="flex justify-center lg:pt-4 pt-8 pb-0">
              <div className="p-3 text-center">
                <div className="h-6 w-10 bg-slate-200 rounded-md" />
                <span className="text-sm text-slate-400">Posts</span>
              </div>
              <div className="p-3 text-center">
                <div className="h-6 w-10 bg-slate-200 rounded-md" />
                <span className="text-sm text-slate-400">Followers</span>
              </div>
              <div className="p-3 text-center">
                <div className="h-6 w-10 bg-slate-200 rounded-md" />
                <span className="text-sm text-slate-400">Following</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-2">
          <div className="h-6 w-32 bg-slate-200 rounded-md mx-auto" />
        </div>
        <div className="py-6 border-t border-slate-200 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="px-4">
              <span className="rounded-full bg-slate-200 px-3 py-1 text-sm flex gap-2 items-center cursor-pointer">
                <div className="h-5 w-5 bg-slate-300 rounded-full" />
                <span className="h-5 w-10 bg-slate-200 rounded-md" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowersLoadingCard;
