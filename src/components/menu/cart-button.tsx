import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GetIndividualCartAction } from "@/actions/user-action/add-to-cart-action";
import Link from "next/link";

export const CartButton = async () => {
  const data = await GetIndividualCartAction();

  return (
    <Link href={"/cart"}>
      <Button variant={"ghost"} className="hover:bg-inherit relative p-0">
        <ShoppingBag className="h-5 w-5" />
        <div className="absolute -top-3 -right-5">
          <Badge variant={"destructive"}>{data ? data?.length : 0}</Badge>
        </div>
      </Button>
    </Link>
  );
};
