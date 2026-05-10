import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-sm bg-[#1a1a2e]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
