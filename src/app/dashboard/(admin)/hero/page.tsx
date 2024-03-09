import { TitleLabel } from "@/components/common/title-label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AdminHero = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <TitleLabel label={`Total Hero Carousel (0)`} />
        <Link href={"/dashboard/hero/new"}>
          <Button>New Carousel</Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminHero;
