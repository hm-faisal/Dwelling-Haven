import useAuth from "../../../hooks/useAuth";

import useHelmet from "../../../hooks/useHelmet";
const Dashboard = () => {
  const { user } = useAuth();
  const helmet = useHelmet("Dashboard");
  return (
    <div className="flex justify-center items-center flex-col gap-8 h-full">
      {helmet}
      <img
        src={user?.photoURL}
        alt="Profile"
        className="w-52 h-52 rounded-full"
      />
      <div className="content">
        <h2 className="text-4xl font-bold ">Name: {user?.displayName}</h2>
        <h5 className="text-2xl font-bold ">Email: {user?.email}</h5>
      </div>
    </div>
  );
};

export default Dashboard;
