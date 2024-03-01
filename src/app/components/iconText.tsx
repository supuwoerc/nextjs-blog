export interface IconTextProps {
  icon: React.ReactNode;
  text: string;
}
const IconText: React.FC<IconTextProps> = ({ icon, text }) => {
  return (
    <div className="flex items-center justify-start gap-[2px] text-[12px]">
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default IconText;
