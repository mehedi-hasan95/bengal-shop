import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-7">
      <Skeleton className="w-[400px] h-[400px]" />
      <Skeleton className="w-[400px] h-[400px]" />
      <Skeleton className="w-[400px] h-[400px]" />
    </div>
  );
}
