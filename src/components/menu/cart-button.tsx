import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const CartButton = () => {
  return (
    <Button variant={"ghost"} className="hover:bg-inherit relative p-0">
      <ShoppingBag className="h-5 w-5" />
      <div className="absolute -top-3 -right-5">
        <Badge variant={"destructive"}>0</Badge>
      </div>
    </Button>
  );
};
