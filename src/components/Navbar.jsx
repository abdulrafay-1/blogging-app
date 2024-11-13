import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import useUser from "../hooks/useUser";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("loggedUser");
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const getUserName = () => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    console.log(loggedUser);
    setUser(loggedUser);
  };

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <div className="flex items-center text-white  font-medium  justify-between bg-primary py-3">
      <Link to="/">
        <h2 className="md:text-2xl text-lg ml-2">Personal Blogging App</h2>
      </Link>
      <div className="flex items-center gap-1 mr-1">
        {user ? (
          <>
            <div className="relative">
              <input
                type="checkbox"
                id="dropdown-toggle"
                className="hidden peer"
                checked={isOpen}
                readOnly
              />

              <label
                htmlFor="dropdown-toggle"
                className=" text-white text-center rounded-lg cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <img src="/dropdown.svg" width="20px" height="20px" alt="" />
              </label>

              <div className="absolute w-28 left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg hidden peer-checked:block">
                <Link
                  to="/"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Add Blog
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            </div>
            <p className=" md:block hidden md:text-sm  uppercase">
              {`Welcome ${user.fullName.toUpperCase()} !`}
            </p>
            <Link to="/profile">
              <img
                width="40px"
                height="40px"
                className="rounded-full"
                src={
                  user.profile
                    ? user.profile
                    : "https://wallpapers.com/images/hd/user-profile-placeholder-icon-jiv4adftoq5dhj54.jpg"
                }
                alt="profile"
              />
            </Link>

            <p
              onClick={logout}
              className="hover:cursor-pointer text-sm md:text-base border px-3 py-1 rounded-md"
            >
              Logout
            </p>
          </>
        ) : (
          <Link to={"/login"}>
            <p className="hover:cursor-pointer border px-3 py-1 rounded-md">
              Login
            </p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
