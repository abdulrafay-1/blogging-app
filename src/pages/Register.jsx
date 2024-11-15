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
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed up
        uploadFile(profile.current.files[0])
          .then((res) => {
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
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <MyToastContainer />
      <header className="p-3 text-white flex justify-between items-center bg-primary">
        <Link to="/">
          <h2 className="font-medium text-xl">Personal Blogging App</h2>
        </Link>
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
                className="border p-2 disabled:opacity-50 disabled:pointer-events-none  rounded-md border-gray-300 bg-primary text-white active:translate-y-0.5"
              >
                {loading && (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-purple-400 animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
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
