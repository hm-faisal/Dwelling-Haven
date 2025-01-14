import { Link, NavLink } from "react-router";
import useDevice from "../hooks/useDevice";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const { siteName } = useDevice();
  const signOutHandler = () => {
    signOutUser();
  };
  const navItems = () => {
    const navItemsClassNames = "";
    const items = {
      "/": "Home",
      "/all-properties": "All properties",
      "/dashboard": "Dashboard",
    };
    return Object.entries(items).map((entry, i) => (
      <li key={i}>
        <NavLink to={entry[0]} className={navItemsClassNames}>
          {entry[1]}
        </NavLink>
      </li>
    ));
  };

  return (
    <>
      <div className="navbar bg-opacity-25 fixed z-10 font-semibold">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems()}
            </ul>
          </div>
          <Link to={"/"} className="btn border-none text-text bg-transparent">
            {siteName}
          </Link>
          <ul className="menu menu-horizontal px-1">{navItems()}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <img
                src={user.photoURL}
                className="w-12 h-12 rounded-full mr-2"
              />
              <span className="mr-2">{user.displayName}</span>
              <button className="btn" onClick={signOutHandler}>
                logout
              </button>
            </>
          ) : (
            <>
              <NavLink to={"/sign-in"} className="btn mr-2">
                Sign In
              </NavLink>
              <NavLink to={"/sign-up"} className="btn">
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
