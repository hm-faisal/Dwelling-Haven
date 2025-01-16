import { Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import Home from "../pages/home/Home";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import AddProperty from "../pages/addProperty/AddProperty";
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

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Home page  */}
        <Route index element={<Home />} />

        {/* Add Property Page  */}
        <Route path={"add-Properties"} element={<AddProperty />} />

        {/* Auth Page  */}
        <Route path="sign-in" element={<SignIn />} />

        <Route path="sign-up" element={<SignUp />} />

        {/* Testing Page  */}
        <Route path="test" element={<Test />} />
      </Route>
      {/* User Route  */}
      <Route path="/user" element={<UserLayout />}>
        {/* Profile Page  */}
        <Route path="profile" element={<Dashboard />} />

        <Route path="property-bought" element={<PropertyBought />} />

        <Route path="manage-wishlist" element={<ManageWishlist />} />

        <Route path="my-reviews" element={<MyReview />} />
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
