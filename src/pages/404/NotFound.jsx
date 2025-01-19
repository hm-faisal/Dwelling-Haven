import { Link } from "react-router";

const NotFound = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen flex-col gap-8">
        <h2>
          <span className="text-9xl font-bold text-accent">4</span>
          <span className="text-9xl font-bold text-secondary">0</span>
          <span className="text-9xl font-bold text-accent">4</span>
        </h2>
        <p className="text-2xl font-bold ">Oh ! Page Not Found !!!</p>
        <Link to={"/"} className="btn btn-accent">
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
