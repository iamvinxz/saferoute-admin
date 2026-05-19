import SideBar from "@/components/SideBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex">
      <SideBar />
      <main className="w-full h-screen overflow-auto transition-all duration-300">
        {children}
      </main>
    </div>
  );
};

export default Layout;
