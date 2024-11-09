import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth, db } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import eyeHide from "/eye-off.svg";
import eyeShow from "/eye-show.svg";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [error, setError] = useState(false);
  const [passShown, setIsPassShown] = useState(false);

  const fullName = useRef();
  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (password.current.value.length < 6) {
      setError("password should contains 6 characters");
      return;
    }

    if (
      !email.current.value.trim() ||
      !password.current.value.trim() ||
      !fullName.current.value.trim()
    ) {
      return;
    }
    if (fullName.current.value.trim().length < 3) {
      setError("Full name should be greater than 3 letters");
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), {
          email: email.current.value,
          password: password.current.value,
          fullName: fullName.current.value,
          uid: user.uid,
        });

        localStorage.setItem("loggedUser", JSON.stringify(user));
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode);
      });
  };

  return (
    <>
      <header className="p-3 text-white flex justify-between items-center bg-primary">
        <h2 className="font-medium text-xl">Personal Blogging App</h2>
        <Link to="/login">
          <p className="hover:cursor-pointer hover:underline px-3 py-1 rounded-md">
            Login
          </p>
        </Link>
      </header>
      <div className="h-screen flex items-center justify-center bg-gray-200">
        <div className="w-[420px] bg-white px-3 py-5 rounded-lg shadow-md border border-gray-300">
          <h2 className="text-center text-2xl font-medium mb-3">Register</h2>
          <div>
            <form
              onSubmit={(e) => registerUser(e)}
              className="flex flex-col gap-3"
            >
              <input
                type="text"
                ref={fullName}
                className="border p-2 rounded-md border-gray-300 focus:outline-primary"
                required
                placeholder="Full Name..."
              />
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
                  className="absolute right-2 top-1 cursor-pointer"
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
                className="border p-2 rounded-md border-gray-300 bg-primary text-white active:translate-y-0.5"
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

export default Register;
