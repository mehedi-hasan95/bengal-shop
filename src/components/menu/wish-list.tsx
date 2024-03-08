import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WishList = () => {
  return (
    <div>
      <Button variant={"ghost"} className="hover:bg-inherit p-0">
        <Heart className="h-5 w-5" />
      </Button>
    </div>
  );
};
