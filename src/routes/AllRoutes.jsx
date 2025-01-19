import { Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import Home from "../pages/home/Home";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import AdminLayout from "../layout/AdminLayout";
import Admin from "../pages/admin/Admin";
import ManageProperties from "../pages/admin/manageProperties/ManageProperties";
import ManageUsers from "../pages/admin/manageUsers/ManageUsers";
import ManageReview from "../pages/admin/manageReview/ManageReview";
import Dashboard from "../pages/user/dashboard/Dashboard";
import UserLayout from "../layout/UserLayout";
import PropertyBought from "../pages/user/property/PropertyBought";
import ManageWishlist from "../pages/user/wishlist/ManageWishlist";
import MyReview from "../pages/user/review/MyReview";
import AgentLayout from "../layout/AgentLayout";
import Agent from "../pages/agent/Agent";
import MyProperties from "../pages/agent/MyProperties";
import AddProperty from "../pages/agent/AddProperty";
import MySold from "../pages/agent/MySold";
import RequestedProperties from "../pages/agent/RequestedProperties";
import UpdateProperties from "../pages/agent/UpdateProperties";
import PropertyDetails from "../pages/property/PropertyDetails";
import BuyProperty from "../pages/buyProperty/BuyProperty";
import AllProperties from "../pages/allProperties/AllProperties";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/404/NotFound";
import AdvertiseProperty from "../pages/admin/advertiseProperty/AdvertiseProperty";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Home page  */}
        <Route index element={<Home />} />

        <Route
          path="all-properties"
          element={
            <PrivateRoute>
              <AllProperties />
            </PrivateRoute>
          }
        />

        <Route
          path="properties/:id"
          element={
            <PrivateRoute>
              <PropertyDetails />
            </PrivateRoute>
          }
        />

        {/* Auth Page  */}
        <Route path="sign-in" element={<SignIn />} />

        <Route path="sign-up" element={<SignUp />} />
      </Route>

      {/* User Route (private)  */}

      <Route path="user" element={<UserLayout />}>
        <Route path="profile" element={<Dashboard />} />

        <Route path="buy-properties/:id" element={<BuyProperty />} />

        <Route path="property-bought" element={<PropertyBought />} />

        <Route path="manage-wishlist" element={<ManageWishlist />} />

        <Route path="my-reviews" element={<MyReview />} />
      </Route>

      {/* Agent Route (private) */}

      <Route path="agent" element={<AgentLayout />}>
        <Route path="profile" element={<Agent />} />

        <Route path="add-Properties" element={<AddProperty />} />

        <Route path="my-properties" element={<MyProperties />} />

        <Route path="update-properties/:id" element={<UpdateProperties />} />

        <Route path="sold-properties" element={<MySold />} />

        <Route path="requested-properties" element={<RequestedProperties />} />
      </Route>

      {/* Admin Route (private)  */}

      <Route path="admin" element={<AdminLayout />}>
        <Route path="profile" element={<Admin />} />

        <Route path="manage-properties" element={<ManageProperties />} />

        <Route path="advertise-property" element={<AdvertiseProperty />} />

        <Route path="manage-users" element={<ManageUsers />} />

        <Route path="manage-reviews" element={<ManageReview />} />
      </Route>

      {/* 404 Page  */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;
