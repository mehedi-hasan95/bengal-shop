import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex gap-2 items-center">
      <Image
        src="/logo.png"
        alt="Bengal Shop"
        height={500}
        width={500}
        className="h-14 w-16"
      />
      <p className="text-lg md:text-xl lg:text-2xl font-medium">Bengal shop</p>
    </Link>
  );
};
