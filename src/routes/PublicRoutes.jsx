import { Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import Home from "../pages/home/Home";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Home page  */}
        <Route index element={<Home />} />

        {/* Sign In Page  */}
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
