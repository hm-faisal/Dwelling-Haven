import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useDevice from "../hooks/useDevice";

const Layout = () => {
  const { minHeight } = useDevice();
  console.log(minHeight);
  return (
    <>
      <Navbar />
      <div style={{ minHeight: minHeight && minHeight }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
