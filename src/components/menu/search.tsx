import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";

export const Search = () => {
  return (
    <div className="relative">
      <SearchIcon className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        type="search"
        className="w-full md:w-[400px] pl-9 rounded-full bg-slate-100 dark:bg-slate-700  focus-visible:ring-slate-200"
        placeholder="Search here..."
      />
    </div>
  );
};
