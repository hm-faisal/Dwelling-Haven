import { useContext } from "react";
import DeviceContext from "../context/userDeviceInfo/DeviceContext";

const useDevice = () => {
  const deviceInfo = useContext(DeviceContext);
  return deviceInfo;
};

export default useDevice;
