"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SeconderyMenuItemProps {
  href: string;
  name: string;
}
export const AdminMenuItems = ({ href, name }: SeconderyMenuItemProps) => {
  const pathName = usePathname();
  const isActive =
    (pathName === "/dashboard" && href === "/dashboard") ||
    pathName === href ||
    pathName?.startsWith(`${href}/`);
  return (
    <Link
      href={`${href}`}
      className={cn(
        "hover:text-white hover:bg-theme px-3 py-2 rounded-lg",
        isActive && "bg-theme text-white font-semibold"
      )}
    >
      {name}
    </Link>
  );
};
