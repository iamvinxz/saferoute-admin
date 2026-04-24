const NotificationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full overflow-y-hidden">
      <div className="flex flex-col justify-center pt-10 ml-20">
        <span className="font-semibold text-xl text-blue-600">
          Notification
        </span>
        <span className="text-sm text-[#303030]">
          Monitor flood reports and SOS signals.
        </span>
      </div>

      <div className="grid grid-cols-2">{children}</div>
    </div>
  );
};

export default NotificationLayout;
