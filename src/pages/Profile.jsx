import { updatePassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../config/firebase";
import MyToastContainer from "../components/MyToastContainer";

const Profile = () => {
  const password = useRef();
  const confirmPassword = useRef();
  const [error, setError] = useState(null);

  const updatePass = (e) => {
    e.preventDefault();

    if (
      password.current.value.length < 6 ||
      confirmPassword.current.value.length < 6
    ) {
      setError("password should be greater than 6 characters");
      return;
    }
    if (password.current.value != confirmPassword.current.value) {
      setError("Passwords do not match");
      return;
    }

    updatePassword(auth.currentUser, password.current.value)
      .then(() => {
        toast.success("Password updated successfully !");
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError(error.code);
      });

    console.log(password.current.value);
    console.log(confirmPassword.current.value);
  };

  return (
    <div>
      <MyToastContainer />
      <h1 className="ml-2 py-4 bg-white font-medium text-2xl">Profile</h1>
      <div className="flex my-2 justify-center mt-4">
        <div className="border w-full md:w-[680px] bg-white border-gray-300 rounded-md shadow-lg p-4">
          <h2 className="text-xl font-medium mb-4">Rafay</h2>
          <h3 className="text-lg font-medium mb-2">Change Password :</h3>
          <div className="flex flex-col">
            <form onSubmit={(e) => updatePass(e)}>
              <div>
                <input
                  type="text"
                  placeholder="new password"
                  className="px-2 mb-2 py-2 w-49 rounded-md border border-gray-300 focus:outline-primary "
                  ref={password}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="repeat password"
                  className="px-2 mb-2 py-2 rounded-md border border-gray-300 focus:outline-primary "
                  ref={confirmPassword}
                />
              </div>
              {error && <div className="mb-2 text-red-500">{error}</div>}
              <button
                type="submit"
                className="bg-primary px-3 rounded-md py-2 text-white"
              >
                Update password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
