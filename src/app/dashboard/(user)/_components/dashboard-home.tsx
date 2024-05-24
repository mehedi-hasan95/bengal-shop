"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const DashboardHome = () => {
  const pathName = usePathname();
  const isActive = pathName === "/dashboard";
  return (
    <Link
      href={"/dashboard"}
      className={cn(
        "hover:text-white hover:bg-theme px-3 py-2 rounded-lg",
        isActive && "bg-theme text-white font-semibold"
      )}
    >
      Dashboard
    </Link>
  );
};
