import Image from "next/image";

interface EmptyProps {
  title: string;
}
export const Empty = ({ title }: EmptyProps) => {
  return (
    <div className="flex justify-center items-center flex-col gap-7">
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-theme">
        {title}
      </h2>
      <Image src={"/empty.gif"} alt="" height={500} width={500} />
    </div>
  );
};
