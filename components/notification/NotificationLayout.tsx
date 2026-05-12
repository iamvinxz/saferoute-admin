const NotificationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full bg-[#f8fafc]  h-full ">
      <div className="flex flex-col max-sm:pl-20 justify-center max-sm:ml-0 ml-9 pt-10 ">
        <div>
          <h1 className="text-xl font-semibold text-blue-500">Notifications</h1>
          <p className="text-sm text-slate-400">Manage and create accounts.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 max-md:grid max-md:grid-cols-1">
        {children}
      </div>
    </div>
  );
};

export default NotificationLayout;
