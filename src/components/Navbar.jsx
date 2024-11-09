import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import useUser from "../hooks/useUser";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const Navbar = () => {
  const [user, setUser] = useState();

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

  const getUserName = async () => {
    const userData = await useUser();

    if (userData) {
      const q = query(
        collection(db, "users"),
        where("uid", "==", userData.uid)
      );
      let data;
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data = doc.data();
      });
      setUser(data);
    }
  };

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <div className="flex items-center text-white  font-medium  justify-between bg-primary py-3">
      <h2 className="md:text-2xl text-lg ml-2">Personal Blogging App</h2>
      <div className="flex items-center gap-1 mr-1">
        {user ? (
          <>
            <Link to="/profile">
              <p className="font-normal hover:underline text-sm uppercase">
                {`Welcome ${user.fullName.toUpperCase()} !`}
              </p>
            </Link>

            <p
              onClick={logout}
              className="hover:cursor-pointer hover:bg-[#8b61ff] border px-3 py-1 rounded-md"
            >
              Logout
            </p>
          </>
        ) : (
          <Link to={"/login"}>
            <p className="hover:cursor-pointer hover:bg-[#8b61ff] border px-3 py-1 rounded-md">
              Login
            </p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
