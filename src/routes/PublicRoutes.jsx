import { Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import Home from "../pages/Home";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
