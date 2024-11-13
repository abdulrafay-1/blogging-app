import React, { useEffect, useRef, useState } from "react";
import { auth } from "../config/firebase";
import addDocument from "../utils/addDoc";
import getUserDocs from "../utils/getUserDocs";
import { toast } from "react-toastify";
import BlogCard from "../components/BlogCard";
import myDeleteDoc from "../utils/deleteDoc";
import MyToastContainer from "../components/MyToastContainer";
import updateDocument from "../utils/updateDocument";

const Dashboard = () => {
  const titleInput = useRef();
  const descriptionInput = useRef();
  const [user, setUser] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const [blogDetails, setBlogDetails] = useState(null);
  const [refreshBlogs, setRefreshBlogs] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem("loggedUser"));
    console.log(storageUser);
    setUser(storageUser);
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
    if (blogDetails) {
      const updateBlogObj = {
        title: titleInput.current.value,
        description: descriptionInput.current.value,
      };
      setLoading(true);
      updateDocument(blogDetails.docId, updateBlogObj)
        .then((res) => {
          setRefreshBlogs(refreshBlogs + 1);
          toast.success("Blog Updated");
          titleInput.current.value = "";
          descriptionInput.current.value = "";
          setBlogDetails(null);
        })
        .catch((err) => {
          setError(JSON.stringify(err));
        })
        .finally(() => {
          setLoading(false);
        });
      return;
    }

    const blogObj = {
      title: titleInput.current.value,
      description: descriptionInput.current.value,
      fullName: user.fullName,
      time: Date.now(),
      uid: user.uid,
      profile: user.profile,
    };
    setRefreshBlogs(refreshBlogs + 1);
    setLoading(true);
    addDocument("blogs", blogObj)
      .then(() => {
        titleInput.current.value = "";
        descriptionInput.current.value = "";
        toast.success("Blog Added Successfully !");
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
        setError(false);
      });
  };

  useEffect(() => {
    getUserDocs("blogs", auth.currentUser.uid, "uid").then((res) => {
      setUserBlogs(res);
    });
  }, [refreshBlogs]);

  const editBlog = (blogItem) => {
    console.log(blogItem);
    setBlogDetails(blogItem);
    titleInput.current.value = blogItem.title;
    descriptionInput.current.value = blogItem.description;
  };

  const deleteBlog = (docid) => {
    setRefreshBlogs(refreshBlogs + 1);
    myDeleteDoc("blogs", docid).then((res) => {
      toast.info("Blog deleted");
    });
  };

  return (
    <>
      <MyToastContainer />
      <h1 className="py-5 shadow-sm px-2 text-2xl bg-white font-semibold">
        Dashboard
      </h1>
      <div className="flex flex-col items-center mx-2">
        <div className="w-full md:w-[680px]">
          <form
            className="flex flex-col p-5 my-4 rounded-lg shadow-md bg-white"
            onSubmit={(e) => publishBlog(e)}
          >
            <input
              type="text"
              ref={titleInput}
              className="p-2 mb-2 border border-gray-400 focus:outline-primary rounded-md"
              placeholder="Title..."
              required
            />
            <textarea
              ref={descriptionInput}
              placeholder="What's on your mind"
              className="p-2 mb-2 border border-gray-400 focus:outline-primary rounded-md"
              required
              rows={4}
            ></textarea>
            {error && <div className="text-red-500">*{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="text-white disabled:opacity-50 hover:opacity-90 disabled:pointer-events-none self-start bg-primary px-3 py-2 rounded-md"
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
              Publish Blog
            </button>
          </form>
          <div className="flex flex-wrap gap-3 mb-2">
            {userBlogs.length > 0 &&
              userBlogs.map((item) => (
                <BlogCard
                  key={item.docId}
                  title={item.title}
                  description={item.description}
                  time={item.time}
                  fullName={item.fullName}
                  profile={item.profile}
                >
                  <div className="flex text-primary mt-2 gap-2 ">
                    <p
                      className=" hover:underline hover:cursor-pointer text-sm"
                      onClick={() => editBlog(item)}
                    >
                      Edit
                    </p>
                    <p
                      className="text-primary hover:underline hover:cursor-pointer text-sm"
                      onClick={() => deleteBlog(item.docId)}
                    >
                      Delete
                    </p>
                  </div>
                </BlogCard>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
