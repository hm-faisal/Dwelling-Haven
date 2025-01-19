import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import swal from "sweetalert";
import SocialLogin from "./SocialLogin";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const SignIn = () => {
  const { signInUserWithEmailPassword, setUser } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    signInUserWithEmailPassword(email, password)
      .then((res) => {
        setUser(res.user);
        navigate(location.state ? location?.state : "/");
        swal("Sign In ", "successfully Sign In", "success");
      })
      .catch((e) => {
        setError(e);
      });
  };

  console.log();
  const forgotPassword = () =>
    swal(
      "Forgot Password",
      "Your Password reset request save in database, Please wait patiently",
      "success"
    );

  return (
    <>
      <div className="pt-24">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center items-center gap-4 flex-col max-w-sm mx-auto"
        >
          {/* email input box */}
          <div className="form-control w-full">
            <label className="label font-bold">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="username@example.com"
              className="input input-bordered"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>
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
            <button
              className="text-blue-700 text-sm text-start mt-2"
              onClick={forgotPassword}
            >
              Forgot Your Password ?
            </button>
            {error && <span className="text-red-700">{error.message}</span>}
          </div>
          <div className="form-control w-full mt-4">
            <input
              type="submit"
              className="btn btn-primary"
              value={"Sign In"}
            />
          </div>
          <div className="or">or</div>
          <div className="form-control w-full">
            <SocialLogin />
          </div>
          <div className="redirect">
            Don&apos;t have account{" "}
            <Link className="text-blue-700" to={"/sign-up"}>
              Go to sign up page
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
