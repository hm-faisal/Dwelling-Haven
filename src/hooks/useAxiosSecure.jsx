import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import swal from "sweetalert";

const axiosInstance = axios.create({
  baseURL: "https://faisalcafeserver.vercel.app",
  // baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.interceptors.request.use(
      (res) => res,
      (err) => {
        if (err.status === 401 || err.status === 403) {
          signOutUser()
            .then(() => {
              swal(
                "Unauthorized",
                "Unauthorized Access please sign in again",
                "warning"
              );
              navigate("/signIn");
            })
            .catch((e) => console.log(e));
          console.log("Error Find in Interceptor", err);
          Promise.reject(err);
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return axiosInstance;
};

export default useAxiosSecure;
