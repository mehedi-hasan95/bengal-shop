import { AlignLeft, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { GetAllCategoryAction } from "@/actions/admin-action/admin-category-action";
import Link from "next/link";
import Image from "next/image";

export const CategoryMenu = async () => {
  const data = await GetAllCategoryAction();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex justify-between md:w-80 bg-theme rounded-full items-center px-6 py-3 text-white cursor-pointer">
          <AlignLeft className="h-4 w-4" />
          <p>All Categories</p>
          <ChevronDown className="h-4 w-4" />
        </div>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Categories</SheetTitle>
          {data.map((item) => (
            <Link href={`/categories/${item.url}`} key={item.id}>
              <SheetClose asChild>
                <SheetDescription className="bg-gray-100 py-2 px-2 hover:bg-theme_green cursor-pointer">
                  {item.title}
                </SheetDescription>
              </SheetClose>
            </Link>
          ))}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
