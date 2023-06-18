import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../api/auth";
import UserContext from "../context/UseContext";

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);
  console.log("user", user);
  return (
    <div className="flex justify-between items-center bg-green-700 text-white h-16 px-8 font-bold">
      <NavLink to="/">Home</NavLink>
      <div>
        {user ? (
          <>
            <div className="flex flex-row justify-between items-center gap-4 ">
              <NavLink to="/users">Users</NavLink>
              <NavLink to="/yourpage">My Profile</NavLink>

              <button
                onClick={() => {
                  logout();
                  setUser(false);
                }}
                className="m-4"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <NavLink to="/login" className="mr-4">
              Login
            </NavLink>

            <NavLink to="/register" className="">
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
