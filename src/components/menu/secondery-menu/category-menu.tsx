import { AlignLeft, ChevronDown } from "lucide-react";

export const CategoryMenu = () => {
  return (
    <div className="flex justify-between md:w-80 bg-theme rounded-full items-center px-6 py-3 text-white">
      <AlignLeft className="h-4 w-4" />
      <p>All Categories</p>
      <ChevronDown className="h-4 w-4" />
    </div>
  );
};
