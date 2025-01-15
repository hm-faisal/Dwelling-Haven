import { useLocation, useNavigate } from "react-router";
import swal from "sweetalert";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const SocialLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser, googleSignIn } = useAuth();
  const axiosBase = useAxios();

  const signInHandler = () => {
    googleSignIn()
      .then((res) => {
        setUser(res.user);
        axiosBase
          .post("/user", {
            email: res.user.email,
            name: res.user.displayName,
            role: "user",
          })
          .then((res) => console.log(res.data));
        navigate(location.state ? location?.state : "/");
        swal("Sign In ", "successfully Sign In with Google", "success");
      })
      .catch(() =>
        swal("Error", "An error Occurred , \n Please try Again", "error")
      );
  };
  return (
    <>
      <button className="btn btn-accent -mt-1" onClick={signInHandler}>
        Sign In with google
      </button>
    </>
  );
};

export default SocialLogin;
