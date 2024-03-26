import { GetCategoryProductCountAction } from "@/actions/admin-action/admin-category-action";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  const data = await GetCategoryProductCountAction();
  return (
    <div className="container mx-auto px-6 grid md:grid-cols-3 lg:grid-cols-4 gap-5">
      {data.map((item) => (
        <Link href={`/categories/${item.url}`} key={item.id} className="group">
          <Card>
            <CardHeader>
              <CardTitle className="relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  height={500}
                  width={500}
                />
                <Badge
                  className="absolute right-3 top-3 text-lg"
                  variant={"destructive"}
                >
                  {item._count.products}{" "}
                  {item._count.products <= 1 ? "Item" : "Items"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="bg-theme flex justify-center py-2 text-lg font-semibold text-white group-hover:bg-theme_green group-hover:text-theme">
                {item.title}
              </h2>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default page;
