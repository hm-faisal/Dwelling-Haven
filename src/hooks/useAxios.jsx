import axios from "axios";

const useAxios = () => {
  const axiosURL = axios.create({
    baseURL: "https://faisalcafeserver.vercel.app",
    // baseURL: "http://localhost:5000",
  });

  return axiosURL;
};

export default useAxios;
