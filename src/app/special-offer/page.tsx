import { SpecialOfferAction } from "@/actions/admin-action/offer-action";
import { GetAllWishlistAction } from "@/actions/user-action/add-to-wishlist-action";
import { Empty } from "@/components/common/empty";
import { SingleProduct } from "@/components/common/product-component/single-product";
import { TitleLabel } from "@/components/common/title-label";

const SpecialOffer = async () => {
  const data = await SpecialOfferAction();
  const wish = await GetAllWishlistAction();
  if (!data) {
    return <Empty title="No product found" />;
  }
  return (
    <div className="container mx-auto px-6">
      <TitleLabel label="You will get a special offer form" />
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 py-10">
        {data.map((item) => (
          <SingleProduct key={item.id} item={item} wish={wish} />
        ))}
      </div>
    </div>
  );
};

export default SpecialOffer;
