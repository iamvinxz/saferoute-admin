export const FloodReportCardSkeleton = () => {
  return (
    <div className="space-y-5">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          {/* Image skeleton */}
          <div className="w-full h-40 bg-gray-200 animate-pulse" />

          <div className="p-4 space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-gray-200 animate-pulse shrink-0" />
                <div className="w-32 h-4 rounded bg-gray-200 animate-pulse" />
              </div>
              <div className="w-20 h-6 rounded-full bg-gray-200 animate-pulse shrink-0" />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <div className="w-full h-3 rounded bg-gray-200 animate-pulse" />
              <div className="w-4/5 h-3 rounded bg-gray-200 animate-pulse" />
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-1 border-t border-gray-50">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-gray-200 animate-pulse" />
                <div className="w-36 h-3 rounded bg-gray-200 animate-pulse" />
              </div>
              <div className="w-4 h-4 rounded bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
