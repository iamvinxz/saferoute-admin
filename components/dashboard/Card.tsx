type Props = {
  count: number | undefined;
  label: string;
  desc: string;
  icon: any;
  iconBg: string;
  iconColor: string;
};

const StatCard = ({
  count,
  label,
  desc,
  icon: Icon,
  iconBg,
  iconColor,
}: Props) => {
  return (
    <div className="w-full bg-white rounded-md py-2 px-4 shadow-[0px_1px_2px_-px_rgba(0,0,0,0.25)] flex flex-col gap-5 lg:gap-9 lg:rounded-lg lg:px-5 lg:py-7 lg:shadow-[0px_1px_3.5px_-1px_rgba(0,0,0,0.25)]">
      <div className="flex items-start justify-between">
        <p className="text-[1.8rem] xl:text-4xl font-semibold text-[#303030]">
          {count}
        </p>
        <div className={`${iconBg} p-1 rounded-xs lg:p-2 lg:rounded-md`}>
          <Icon size={14} className={`${iconColor} lg:w-4.5! lg:h-4.5!`} />
        </div>
      </div>
      <div>
        <p className="text-[13px] font-medium text-[#303030] lg:text-lg">
          {label}
        </p>
        <p className="md:block text-[9px] text-gray-400 lg:text-xs">{desc}</p>
      </div>
    </div>
  );
};

export default StatCard;
