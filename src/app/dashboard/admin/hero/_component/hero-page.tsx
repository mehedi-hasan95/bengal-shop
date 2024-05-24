import { DataTable } from "@/components/common/data-table";
import { HeroCarousel, heroColumns } from "./hero-columns";

interface HeroPageProps {
  data: HeroCarousel[];
}

export const HeroPage: React.FC<HeroPageProps> = ({ data }) => {
  return (
    <div className="container mx-auto py-10">
      <DataTable searchKey="title" columns={heroColumns} data={data} />
    </div>
  );
};
