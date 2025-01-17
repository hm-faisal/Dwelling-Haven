import { Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import Home from "../pages/home/Home";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import Test from "../pages/test/Test";
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

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Home page  */}
        <Route index element={<Home />} />

        <Route path="/properties/:id" element={<PropertyDetails />} />

        {/* Add Property Page  */}

        {/* Auth Page  */}
        <Route path="sign-in" element={<SignIn />} />

        <Route path="sign-up" element={<SignUp />} />

        {/* Testing Page  */}
        <Route path="test" element={<Test />} />
      </Route>
      {/* User Route  */}
      <Route path="user" element={<UserLayout />}>
        {/* Profile Page  */}
        <Route path="profile" element={<Dashboard />} />

        <Route path="property-bought" element={<PropertyBought />} />

        <Route path="manage-wishlist" element={<ManageWishlist />} />

        <Route path="my-reviews" element={<MyReview />} />
      </Route>

      {/* Agent Route  */}
      <Route path="agent" element={<AgentLayout />}>
        <Route path="profile" element={<Agent />} />

        <Route path="add-Properties" element={<AddProperty />} />

        <Route path="my-properties" element={<MyProperties />} />

        <Route path="update-properties/:id" element={<UpdateProperties />} />

        <Route path="sold-properties" element={<MySold />} />

        <Route path="requested-properties" element={<RequestedProperties />} />
      </Route>

      {/* Admin Route  */}
      <Route path="admin" element={<AdminLayout />}>
        {/* Admin Page  */}
        <Route path="profile" element={<Admin />} />
        {/* Admin Manage Property Page  */}
        <Route path="manage-properties" element={<ManageProperties />} />
        {/* Admin Manage Property Page  */}
        <Route path="manage-users" element={<ManageUsers />} />
        {/* Admin Manage Property Page  */}
        <Route path="manage-reviews" element={<ManageReview />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
