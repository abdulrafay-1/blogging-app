import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import eyeHide from "/eye-off.svg";
import eyeShow from "/eye-show.svg";
import { toast } from "react-toastify";
import getUserDocs from "../utils/getUserDocs";
import MyToastContainer from "../components/MyToastContainer";

const Login = () => {
  const [passShown, setIsPassShown] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    if ((!email.current.value.trim(), !password.current.value.trim())) {
      return;
    }
    if (password.current.value.length < 6) {
      setError("password should contains 6 characters");
      return;
    }
    try {
      setLoading(true);
      setError(false);
      const { user } = await signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );
      toast.success("Login Successfull");
      const res = await getUserDocs("users", user.uid, "uid");
      console.log(res);
      localStorage.setItem(
        "loggedUser",
        JSON.stringify({ ...user, ...res[0] })
      );
      navigate("/");
    } catch (error) {
      setError(error.code);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MyToastContainer />
      <header className="p-3 text-white flex justify-between items-center bg-primary">
        <h2 className="font-medium text-xl">Personal Blogging App</h2>
        <Link to="/register">
          <p className="hover:cursor-pointer hover:underline px-3 py-1 rounded-md">
            Register
          </p>
        </Link>
      </header>
      <div className="h-screen flex items-center justify-center bg-gray-200">
        <div className="w-[420px] bg-white px-3 py-5 rounded-lg shadow-md border border-gray-300">
          <h2 className="text-center text-2xl font-medium mb-3">Login</h2>
          <div>
            <form
              onSubmit={(e) => loginUser(e)}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                ref={email}
                className="border p-2 rounded-md border-gray-300 focus:outline-primary"
                required
                placeholder="email..."
              />
              <div className="relative ">
                <img
                  src={passShown ? eyeHide : eyeShow}
                  alt="eyeshow"
                  width={28}
                  height={28}
                  className="absolute right-2 top-2 cursor-pointer"
                  onClick={() => setIsPassShown(!passShown)}
                />
                <input
                  type={passShown ? "text" : "password"}
                  ref={password}
                  className="border w-full p-2 rounded-md border-gray-300 focus:outline-primary"
                  required
                  placeholder="password..."
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="border p-2 disabled:opacity-50 rounded-md border-gray-300 bg-primary text-white active:translate-y-0.5"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
