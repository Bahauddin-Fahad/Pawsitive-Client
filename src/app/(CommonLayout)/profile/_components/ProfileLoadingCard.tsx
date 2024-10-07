const ProfileLoadingCard = () => {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row">
      <div className="group relative sm:w-[350px]">
        <div className="h-[400px] w-[350px] scale-105 transform rounded-lg bg-secondary animate-pulse" />
      </div>
      <div className="min-w-[250px] max-w-[450px] space-y-12 rounded-br-lg rounded-tr-lg bg-cusrom p-10 text-center shadow-md shadow-secondary md:w-[350px]">
        <div className="space-y-1">
          <div className="flex justify-center gap-2 items-center">
            <div className="h-8 w-36 bg-secondary animate-pulse rounded-lg" />
            <div className="h-6 w-6 bg-secondary animate-pulse rounded-full" />
          </div>
          <div className="h-4 w-48 bg-secondary animate-pulse rounded" />
          <div className="py-2">
            <div className="h-6 w-24 bg-secondary animate-pulse rounded-full" />
          </div>
          <div className="flex gap-1 justify-center items-center">
            <div className="h-6 w-36 bg-secondary animate-pulse rounded-lg" />
            <div className="h-6 w-6 bg-secondary animate-pulse rounded-full" />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between">
          <div className="space-y-1">
            <div className="h-4 w-12 bg-secondary animate-pulse rounded" />
            <div className="h-6 w-16 bg-secondary animate-pulse rounded" />
          </div>
          <div className="space-y-1">
            <div className="h-4 w-12 bg-secondary animate-pulse rounded" />
            <div className="h-6 w-16 bg-secondary animate-pulse rounded" />
          </div>
          <div className="space-y-1">
            <div className="h-4 w-12 bg-secondary animate-pulse rounded" />
            <div className="h-6 w-16 bg-secondary animate-pulse rounded" />
          </div>
        </div>
        <div>
          <div className="h-10 w-32 bg-secondary animate-pulse rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ProfileLoadingCard;
