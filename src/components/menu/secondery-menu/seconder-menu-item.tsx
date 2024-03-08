"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SeconderyMenuItemProps {
  href: string;
  name: string;
}
export const SeconderyMenuItem = ({ href, name }: SeconderyMenuItemProps) => {
  const pathName = usePathname();
  const isActive =
    (pathName === "/" && href === "/") ||
    pathName === href ||
    pathName?.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className={cn(
        "hover:border-b-2 hover:border-theme",
        isActive && "border-b-2 border-theme font-semibold"
      )}
    >
      {name}
    </Link>
  );
};
