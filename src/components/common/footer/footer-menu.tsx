import { Logo } from "@/components/menu/logo";
import Image from "next/image";
import Link from "next/link";
import { FooterBottom } from "./footer-bottom";

export const FooterMenu = () => {
  return (
    <div className="bg-slate-100 mt-10 pb-7">
      <div className="container m-auto px-4 pt-10 pb-5">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <Logo />
            <p className="py-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              diam ornare nam est gravida. Netus viverra rhoncus sit magna
              sapien ac eget parturient id. Est luctus dapibus quam aliquam in
              nisl turpis. Elit et dictum lacus morbi nec accumsan a in.
            </p>
            <div className="flex gap-5">
              <Image
                src="/Apple.png"
                alt=""
                height={500}
                width={500}
                className="h-10 w-36"
              />
              <Image
                src="/Playstore.png"
                alt=""
                height={500}
                width={500}
                className="h-10 w-36"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link href="#" className="font-bold">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#">About Karte</Link>
                </li>
                <li>
                  <Link href="#">Contact</Link>
                </li>
                <li>
                  <Link href="#">Career</Link>
                </li>
                <li>
                  <Link href="#">Terms & Conditions</Link>
                </li>
                <li>
                  <Link href="#">Category</Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link href="#" className="font-bold">
                    Info
                  </Link>
                </li>
                <li>
                  <Link href="#">information</Link>
                </li>
                <li>
                  <Link href="#">Shipping</Link>
                </li>
                <li>
                  <Link href="#">Payment</Link>
                </li>
                <li>
                  <Link href="#">Return</Link>
                </li>
                <li>
                  <Link href="#">Blog</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <FooterBottom />
      </div>
    </div>
  );
};
