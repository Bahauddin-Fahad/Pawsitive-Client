const LoadingCardDashboard = () => {
  return (
    <div className="py-4 relative bg-custom shadow-lg rounded-lg w-full max-w-md mx-auto">
      <div className="pb-0 pt-2 px-4">
        <div className="flex gap-2 items-start">
          {/* Avatar Skeleton */}
          <div className="w-10 h-10 bg-secondary rounded-full animate-pulse" />
          <div>
            {/* Name Skeleton */}
            <div className="w-24 h-4 bg-secondary rounded-md animate-pulse" />
            {/* Date Skeleton */}
            <div className="w-32 h-3 bg-secondary rounded-md animate-pulse mt-2" />
          </div>
          <div className="absolute top-3 right-5">
            {/* Dropdown Skeleton */}
            <div className="w-6 h-6 bg-secondary rounded-full animate-pulse" />
          </div>
        </div>
      </div>
      <h4 className="font-bold text-lg flex-grow px-4 mt-4">
        <div className="w-3/4 h-6 bg-secondary rounded-md animate-pulse" />
      </h4>
      <div className="py-2 px-4">
        {/* Image Skeleton */}
        <div className="w-full h-40 bg-secondary rounded-lg animate-pulse" />
      </div>
    </div>
  );
};

export default LoadingCardDashboard;
