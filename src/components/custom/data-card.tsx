import { Card } from "@/components/ui/card";
import { FormatPrice } from "@/lib/format-price";
import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  icon: LucideIcon;
  value: number;
  shouldFormat?: boolean;
}
export const DataCard = ({ icon: Icon, label, value, shouldFormat }: Props) => {
  return (
    <Card className="p-5 space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">{label}</h4>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold">
        {shouldFormat ? FormatPrice(value) : value}
      </h2>
    </Card>
  );
};
