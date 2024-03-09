interface TitleLabelProps {
  label: string;
}
export const TitleLabel = ({ label }: TitleLabelProps) => {
  return (
    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">{label}</h2>
  );
};
