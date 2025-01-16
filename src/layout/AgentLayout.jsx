import { Outlet } from "react-router";
import Navbar from "../pages/agent/Navbar";

const AgentLayout = () => {
  return (
    <div className="grid grid-cols-12 h-[100vh] grid-rows-12">
      <Navbar className="col-span-2 row-span-12 border-r-2 border" />
      <div className="my-12 col-span-10 row-span-12 overflow-y-scroll mx-12">
        <Outlet />
      </div>
    </div>
  );
};

export default AgentLayout;
