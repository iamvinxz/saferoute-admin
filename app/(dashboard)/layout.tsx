import SideBar from "@/components/SideBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex">
      <SideBar />
      <main
        className="flex-1 h-screen overflow-auto transition-all duration-300"
        style={{ marginLeft: "var(--sidebar-w, 7.5rem)" }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
