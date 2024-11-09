import React, { useEffect, useRef, useState } from "react";
import useUser from "../hooks/useUser";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const Dashboard = () => {
  const titleInput = useRef();
  const descriptionInput = useRef();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("loggedUser"));
    console.log(temp);
    setUser(temp);
    console.log(user);
    const docRef = doc(db, "users", temp.uid);
    getDoc(docRef).then((data) => {
      if (data.exists()) {
        console.log("Document data:", data.data());
        let newVar = {
          ...temp,
          ...data.data(),
        };
        console.log("newVar", newVar);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  }, []);

  const publishBlog = (e) => {
    e.preventDefault();
    if (titleInput.current.value.trim().length < 5) {
      setError("Title should be more than 5 character");
      return;
    } else if (descriptionInput.current.value.trim().length < 10) {
      setError("Description should be more than 10 character");
      return;
    }
    const blogObj = {
      title: titleInput.current.value,
      description: descriptionInput.current.value,
      time: new Date().toDateString(),
      userUid: user.uid,
    };
    console.log(blogObj);
  };

  return (
    <>
      <h1 className="py-5 shadow-sm px-2 text-2xl bg-white font-semibold">
        Dashboard
      </h1>
      <div className="flex flex-col items-center mx-2">
        <div className="my-4 w-full md:w-[620px] bg-white  rounded-lg shadow-md p-5">
          <form className="flex flex-col" onSubmit={(e) => publishBlog(e)}>
            <input
              type="text"
              ref={titleInput}
              className="p-2 mb-2 border border-gray-400 focus:outline-[#7749f8] rounded-md"
              placeholder="Title..."
              required
            />
            <textarea
              ref={descriptionInput}
              placeholder="What's on your mind"
              className="p-2 mb-2 border border-gray-400 focus:outline-[#7749f8] rounded-md"
              required
              rows={4}
            ></textarea>
            {error && <div className="text-red-500">*{error}</div>}
            <button
              type="submit"
              className="text-white self-start bg-[#7749f8] px-3 py-2 rounded-md"
            >
              Publish Blog
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
