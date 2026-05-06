const NotificationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full ">
      <div className="flex flex-col justify-center ml-20 pt-10 ">
        <span className="font-semibold text-xl text-blue-600">
          Notification
        </span>
        <span className="text-sm text-[#303030]">
          Monitor flood reports and SOS signals.
        </span>
      </div>

      <div className="grid grid-cols-2 max-md:grid max-md:grid-cols-1">
        {children}
      </div>
    </div>
  );
};

export default NotificationLayout;
