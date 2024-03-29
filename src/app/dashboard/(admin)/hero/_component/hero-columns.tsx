"use client";

import { ColumnDef } from "@tanstack/react-table";
import { HeroCell } from "./hero-cell";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type HeroCarousel = {
  id: string;
  title: string;
  image: string;
  createdAt: string;
};

export const heroColumns: ColumnDef<HeroCarousel>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          CreatedAt
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
    cell: ({ row }) => <HeroCell data={row.original} />,
  },
];
