import { Helmet } from "react-helmet";
import useDevice from "./useDevice";

const useHelmet = (route) => {
  const { siteName } = useDevice();
  return (
    <Helmet>
      <title>
        {route} || {siteName}
      </title>
    </Helmet>
  );
};

export default useHelmet;
