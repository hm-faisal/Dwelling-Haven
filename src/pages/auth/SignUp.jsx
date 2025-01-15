import { Link, useLocation, useNavigate } from "react-router";
import swal from "sweetalert";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const SignUp = () => {
  const { setUser, signUpUserWithEmailPassword, updateUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosBase = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password, name, profile } = data;
    signUpUserWithEmailPassword(email, password)
      .then((res) => {
        updateUser(name, profile).then(() => {
          setUser(res.user);
          axiosBase
            .post("/user", {
              email: res.user.email,
              name: res.user.displayName,
              role: "user",
              isFraud: false,
            })
            .then((res) => console.log(res.data));
        });
        swal("Sign Up Successful", "successfully, sign up account", "success");
        navigate(location.state ? location?.state : "/");
      })
      .catch((e) => {
        console.log(e);
        swal(
          "Sorry ! User cannot create",
          "An error Occurred, \n Please try Again, \n or \n check console for details",
          "error"
        );
      });

    console.log(email, password, name, profile);
  };

  return (
    <div className="pt-24">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center items-center gap-4 flex-col max-w-sm mx-auto"
      >
        {/* name input box */}
        <div className="form-control w-full">
          <label className="label font-bold">
            <span className="label-text">Name</span>
          </label>
          <input
            type="name"
            placeholder="Jon Doe"
            className="input input-bordered"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-700">This field is required</span>
          )}
        </div>
        {/* email input box */}
        <div className="form-control w-full">
          <label className="label font-bold">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="jon@example.com"
            className="input input-bordered"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-700">This field is required</span>
          )}
        </div>
        {/* profile url input box */}
        <div className="form-control w-full">
          <label className="label font-bold">
            <span className="label-text">Profile URL</span>
          </label>
          <input
            type="url"
            placeholder="https://www.protfolio.com/profile.jpg"
            className="input input-bordered"
            {...register("profile", { required: true })}
          />
          {errors.profile && (
            <span className="text-red-700">This field is required</span>
          )}
        </div>
        {/* Password input box */}
        <div className="form-control w-full">
          <label className="label font-bold">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter Your Password"
            className="input input-bordered"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-700">This field is required</span>
          )}
        </div>
        <div className="form-control w-full mt-4">
          <input type="submit" className="btn btn-primary" value={"Sign Up"} />
        </div>
        <div className="or">or</div>
        <div className="form-control w-full">
          <SocialLogin />
        </div>
        <div className="redirect">
          Already have an account{" "}
          <Link className="text-blue-700" to={"/sign-up"}>
            Go to sign in page
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
