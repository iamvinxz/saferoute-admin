const SOSCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden w-full"
        >
          {/* Header */}
          <div className="bg-gray-200 animate-pulse px-4 py-2.5 h-9" />

          <div className="p-4">
            {/* People count */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
                <div className="flex flex-col gap-1">
                  <div className="w-24 h-4 rounded bg-gray-200 animate-pulse" />
                  <div className="w-28 h-3 rounded bg-gray-200 animate-pulse" />
                </div>
              </div>
              <div className="w-16 h-5 rounded-full bg-gray-200 animate-pulse" />
            </div>

            {/* Details */}
            <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-200 animate-pulse" />
                <div className="w-32 h-3 rounded bg-gray-200 animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-gray-200 animate-pulse" />
                <div className="w-20 h-3 rounded bg-gray-200 animate-pulse" />
                <div className="w-16 h-5 rounded-full bg-gray-200 animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-200 animate-pulse" />
                <div className="w-14 h-3 rounded bg-gray-200 animate-pulse" />
                <div className="w-36 h-3 rounded bg-gray-200 animate-pulse" />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex gap-2">
              <div className="flex-1 h-8 rounded-lg bg-gray-200 animate-pulse" />
              <div className="flex-1 h-8 rounded-lg bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SOSCardSkeleton;
