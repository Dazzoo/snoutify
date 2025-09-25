interface CustomerCardSkeletonProps {
  className?: string;
}

export function CustomerCardSkeleton({ className = "" }: CustomerCardSkeletonProps) {
  return (
    <div className={`bg-white rounded-lg border border-medium p-4 ${className}`}>
      <div className="flex items-center gap-6">
        {/* Pets Section Skeleton */}
        <div className="w-32 flex-shrink-0">
          <div className="flex flex-col gap-1">
            {/* Pet count skeleton */}
            <div className="h-3 bg-muted rounded w-8 mx-auto animate-pulse"></div>
            {/* Pet badges skeleton */}
            <div className="flex gap-1 justify-center">
              <div className="h-6 bg-muted rounded w-16 animate-pulse"></div>
              <div className="h-6 bg-muted rounded w-20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Border Separator */}
        <div className="w-px h-12 bg-border-medium"></div>

        {/* Customer Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4 mb-2">
            {/* Name skeleton */}
            <div className="h-5 bg-muted rounded w-32 animate-pulse"></div>
            {/* ID skeleton */}
            <div className="h-6 bg-muted rounded w-16 animate-pulse"></div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            {/* Email skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-muted rounded animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-48 animate-pulse"></div>
            </div>
            {/* Phone skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-muted rounded animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-32 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Multiple skeleton cards component for better loading experience
export function CustomerCardsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <CustomerCardSkeleton key={index} />
      ))}
    </div>
  );
}
