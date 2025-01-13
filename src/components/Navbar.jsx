import { NavLink } from "react-router";
import useDevice from "../hooks/useDevice";

const Navbar = () => {
  const { siteName } = useDevice();
  const navItems = () => {
    const navItemsClassNames = "";
    const items = {
      "/": "Home",
      "/contact": "Contact Us",
      "/dashboard": "Dashboard",
      "/menu": "Our Menu",
      "/shop": "Our Shop",
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
      <div className="navbar bg-black bg-opacity-25 fixed z-10 text-white font-semibold">
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
          <a className="btn border-none text-white bg-transparent">
            {siteName}
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems()}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
