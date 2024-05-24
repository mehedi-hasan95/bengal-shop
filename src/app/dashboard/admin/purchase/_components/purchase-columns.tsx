"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { PurchaseCell } from "./purchase-cell";

export type PurchaseTypes = {
  id: string;
  title: string;
  quantity: number;
  price: number;
  createdAt: string;
  image: string;
  status: "IN_PROGRESS" | "ON_THE_WAY" | "DELIVERED";
  offer: null | "BUY_ONE_GET_ONE" | "SPECIAL_OFFERS";
};

export const PurchaseColumns: ColumnDef<PurchaseTypes>[] = [
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
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Delivered
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") || "IN_PROGRESS";
      return (
        <Badge
          className={cn(
            status === "IN_PROGRESS" && "bg-slate-500",
            status === "ON_THE_WAY" && "bg-emerald-500",
            status === "DELIVERED" && "bg-sky-500"
          )}
        >
          {status === "IN_PROGRESS" && "In Process"}
          {status === "ON_THE_WAY" && "On The way"}
          {status === "DELIVERED" && "Delivered"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "offer",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Offer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("offer") || null;
      return (
        <Badge className={cn("bg-slate-500")}>
          {status === null && "No Offer"}
          {status === "BUY_ONE_GET_ONE" && "Buy One Get One"}
          {status === "SPECIAL_OFFERS" && "Special Offer"}
        </Badge>
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
    id: "action",
    header: "Actions",
    cell: ({ row }) => <PurchaseCell data={row.original} />,
  },
];
