import useAuth from "../../hooks/useAuth";
import useHelmet from "../../hooks/useHelmet";

const Admin = () => {
  const { user, userRole } = useAuth();
  return (
    <div className="flex justify-center items-center flex-col gap-8 h-full">
      {useHelmet("Admin")}
      <img
        src={user?.photoURL}
        alt="Profile"
        className="w-52 h-52 rounded-full"
      />
      <div className="content">
        <h2 className="text-4xl font-bold ">Name: {user?.displayName}</h2>
        <h5 className="text-2xl font-bold ">Email: {user?.email}</h5>
        {userRole && <h5 className="text-2xl font-bold ">Role: {userRole}</h5>}
      </div>
    </div>
  );
};

export default Admin;
