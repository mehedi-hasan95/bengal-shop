"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { CategoryCell } from "./category-cell";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryTypes = {
  id: string;
  image: string;
  title: string;
  url: string;
};

export const categoryColumns: ColumnDef<CategoryTypes>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Category Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "url",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Cat Url
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.original.image}
        alt=""
        height={500}
        width={500}
        className="h-10 w-10"
      />
    ),
  },
  {
    id: "action",
    header: "Actions",
    cell: ({ row }) => <CategoryCell data={row.original} />,
  },
];
