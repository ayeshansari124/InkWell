import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
