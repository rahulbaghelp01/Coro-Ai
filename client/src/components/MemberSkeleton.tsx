import Skeleton from "./Skeletons"

export default function MemberSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />

          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-2 w-40" />
          </div>
        </div>
      ))}
    </div>
  )
}