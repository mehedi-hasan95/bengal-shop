import { GetAllProductAction } from "@/actions/admin-action/admin-product-action";
import { GetAllWishlistAction } from "@/actions/user-action/add-to-wishlist-action";
import { SingleProduct } from "@/components/common/product-component/single-product";
import Image from "next/image";

const ShopPage = async () => {
  const data = await GetAllProductAction();
  const wish = await GetAllWishlistAction();
  return (
    <div className="container mx-auto px-6">
      <div className="relative">
        <Image
          src="/hero.png"
          alt=""
          height={500}
          width={500}
          className="h-full w-full"
        />
        <div className="absolute max-w-96 top-1/2 -translate-y-1/2 text-xl md:text-3xl font-bold text-theme left-10">
          Up to 30% Discount on Selected Items
        </div>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 py-10">
        {data.map((item) => (
          <SingleProduct key={item.id} item={item} wish={wish} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
