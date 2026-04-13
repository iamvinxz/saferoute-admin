import SideBar from "@/components/SideBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex">
      <SideBar />
      {children}
    </div>
  );
};

export default Layout;
