import { Navigate, Outlet, useLocation } from "react-router";
import Navbar from "../pages/agent/Navbar";
import useAuth from "../hooks/useAuth";

const AgentLayout = () => {
  const { loading, userRole, roleLoading } = useAuth();
  const location = useLocation();

  if (loading || roleLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (userRole === "agent") {
    return (
      <div className="grid grid-cols-12 h-[100vh] grid-rows-12">
        <Navbar className="lg:col-span-2 lg:row-span-12 border-r-2 border" />
        <div className="my-16 col-span-10 row-span-12 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    );
  }
  return <Navigate state={location?.pathname} to={"/sign-in"} />;
};

export default AgentLayout;
