import { GetAllWishlistAction } from "@/actions/user-action/add-to-wishlist-action";
import { WishListItem } from "./_components/wishlist-item";
import { Empty } from "@/components/common/empty";

const WishListPage = async () => {
  const data = await GetAllWishlistAction();
  return (
    <div className="container mx-auto px-6">
      {!data?.length && <Empty title="No products in Wishlist" />}
      <div className="grid md:grid-cols-3 lg:grid-cols-4">
        {data?.map((item) => (
          <WishListItem key={item.id} wish={item} />
        ))}
      </div>
    </div>
  );
};

export default WishListPage;
