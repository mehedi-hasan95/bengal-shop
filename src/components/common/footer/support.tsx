import Image from "next/image";

export const Support = () => {
  return (
    <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-5 py-12">
      <div className="flex gap-4 items-center">
        <Image
          src="/support-1.png"
          alt=""
          height={500}
          width={500}
          className="h-12 w-12 bg-theme_green p-2 rounded-md"
        />
        <div>
          <h2 className="text-xl font-medium pb-3">24 Customer Support</h2>
          <p>Contact us 24 hours</p>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Image
          src="/support-2.png"
          alt=""
          height={500}
          width={500}
          className="h-12 w-12 bg-theme_green p-2 rounded-md"
        />
        <div>
          <h2 className="text-xl font-medium pb-3">Authentic Products</h2>
          <p>Contact us 24 hours</p>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Image
          src="/support-3.png"
          alt=""
          height={500}
          width={500}
          className="h-12 w-12 bg-theme_green p-2 rounded-md"
        />
        <div>
          <h2 className="text-xl font-medium pb-3">Secure Payment</h2>
          <p>Contact us 24 hours</p>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Image
          src="/support-4.png"
          alt=""
          height={500}
          width={500}
          className="h-12 w-12 bg-theme_green p-2 rounded-md"
        />
        <div>
          <h2 className="text-xl font-medium pb-3">Best Prices & Offers</h2>
          <p>Contact us 24 hours</p>
        </div>
      </div>
    </div>
  );
};
