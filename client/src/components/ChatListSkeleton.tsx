import Skeleton from './Skeletons'

export default function ChatListSkeleton() {
  return (
    <div className="flex flex-col gap-3 px-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex items-center gap-3 px-3 py-3">
          <Skeleton className="h-2 w-2 rounded-full" />

          <Skeleton className="h-4 w-32" />
        </div>
      ))}
    </div>
  )
}