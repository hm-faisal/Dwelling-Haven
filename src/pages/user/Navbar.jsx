import { Link, NavLink } from "react-router";
import useDevice from "../../hooks/useDevice";
import useAuth from "../../hooks/useAuth";

const Navbar = ({ className }) => {
  const { siteName } = useDevice();
  const { signOutUser } = useAuth();
  const signOutHandler = () => {
    signOutUser();
  };

  const navItems = () => {
    const navItemsClassNames = "";
    const items = {
      "/user/profile": "My Profile",
      "/user/manage-wishlist": "Manage Wishlist",
      "/user/property-bought": "Property bought",
      "/user/my-reviews": "My reviews",
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
      <div
        className={`navbar bg-opacity-25  font-semibold flex-col justify-between items-start ${className}`}
      >
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
        </div>
        <div className="navbar-center">
          <ul className="menu menu-vertical px-1">{navItems()}</ul>
        </div>
        <div className="navbar-end justify-start btn border-none text-text bg-transparent">
          <button type="button" onClick={signOutHandler}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
