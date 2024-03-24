import { Facebook, Instagram, Mail, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const FooterBottom = () => {
  const year = new Date().getFullYear();
  return (
    <div className="grid md:grid-cols-3 gap-5 py-20 items-center">
      <div className="flex gap-4">
        <div className="h-10 w-10 p-2 bg-white hover:bg-orange-500 group rounded-xl">
          <Link href="#">
            <Facebook className="h-6 w-6 group-hover:text-white" />
          </Link>
        </div>
        <div className="h-10 w-10 p-2 bg-white hover:bg-orange-500 group rounded-xl">
          <Link href="#">
            <Instagram className="h-6 w-6 group-hover:text-white" />
          </Link>
        </div>
        <div className="h-10 w-10 p-2 bg-white hover:bg-orange-500 group rounded-xl">
          <Link href="#">
            <Twitter className="h-6 w-6 group-hover:text-white" />
          </Link>
        </div>
        <div className="h-10 w-10 p-2 bg-white hover:bg-orange-500 group rounded-xl">
          <Link href="#">
            <Mail className="h-6 w-6 group-hover:text-white" />
          </Link>
        </div>
      </div>
      <p>
        &copy; {year} Copyright All Right Reserved by{" "}
        <Link
          target="_blank"
          href={"https://mehedi95.vercel.app/"}
          className="text-blue-800 underline"
        >
          Mehedi Hasan
        </Link>
      </p>
      <div className="flex gap-6">
        <Image
          src="/paypal.png"
          alt=""
          height={500}
          width={500}
          className="h-5"
        />
        <Image
          src="/visa.png"
          alt=""
          height={500}
          width={500}
          className="h-5"
        />
        <Image
          src="/googlePay.png"
          alt=""
          height={500}
          width={500}
          className="h-5"
        />
        <Image
          src="/applePay.png"
          alt=""
          height={500}
          width={500}
          className="h-5"
        />
      </div>
    </div>
  );
};
