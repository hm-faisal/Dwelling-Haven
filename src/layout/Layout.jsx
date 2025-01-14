import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useDevice from "../hooks/useDevice";

const Layout = () => {
  const { minHeight } = useDevice();
  return (
    <div data-theme="light">
      <Navbar />
      <div
        style={{ minHeight: minHeight && minHeight }}
        className="flex justify-center items-center flex-col"
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
