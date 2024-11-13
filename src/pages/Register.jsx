import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth, db } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import eyeHide from "/eye-off.svg";
import eyeShow from "/eye-show.svg";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import MyToastContainer from "../components/MyToastContainer";
import { uploadFile } from "../config/appWrite";

const Register = () => {
  const [error, setError] = useState(false);
  const [passShown, setIsPassShown] = useState(false);
  const [loading, setLoading] = useState(false);

  const fullName = useRef();
  const email = useRef();
  const password = useRef();
  const profile = useRef();

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
    setLoading(true);
    uploadFile(profile.current.files[0])
      .then((res) => {
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed up
            toast.success("Sigup successfull !");
            const user = userCredential.user;
            let userObj = {
              email: email.current.value,
              password: password.current.value,
              fullName: fullName.current.value,
              uid: user.uid,
              profile: `https://cloud.appwrite.io/v1/storage/buckets/67347e95000d2f8b5294/files/${res.$id}/view?project=67347e45002a1384ba7e&project=67347e45002a1384ba7e`,
            };
            localStorage.setItem(
              "loggedUser",
              JSON.stringify({ ...user, ...userObj })
            );
            setDoc(doc(db, "users", user.uid), userObj).then(() => {
              navigate("/");
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            setError(errorCode);
          })
          .finally(() => setLoading(false));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <MyToastContainer />
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
              <input
                type="file"
                ref={profile}
                accept="image/*"
                required
                className="border w-full file:bg-primary p-2 rounded-md file:border-gray-500 file:border file:rounded-sm file:text-white file:cursor-pointer cursor-pointer border-gray-300 focus:outline-primary"
              />
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

export default Register;
