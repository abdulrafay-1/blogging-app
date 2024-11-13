import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import getUserDocs from "../utils/getUserDocs";
import Loader from "../components/Loader";
// import { orderBy } from "firebase/firestore";

const UserAllBlogs = () => {
  const [userBlog, setUserBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    getUserDocs("blogs", id, "uid").then((res) => {
      if (res.length) {
        setUserBlog(res);
      } else {
        setError(true);
      }
      setLoading(false);
      console.log(res);
    });
  }, []);

  return (
    <>
      <Link to="/">
        <h2 className="font-semibold bg-white p-4 text-2xl text-primary">
          {`<`} Back to all blogs
        </h2>
      </Link>
      {loading && (
        <div className="text-center mt-5">
          <Loader />
        </div>
      )}
      <div className="flex justify-center  mt-2 mx-2">
        <div className="flex flex-col gap-2 w-full md:w-[620px]">
          {userBlog.length > 0 && (
            <>
              <h2 className="text-xl font-medium py-3">
                All from {userBlog[0].fullName}
              </h2>
              {userBlog.map(
                ({ title, description, time, fullName, docId, profile }) => (
                  <BlogCard
                    key={docId}
                    title={title}
                    description={description}
                    time={new Date(time).toDateString()}
                    fullName={fullName}
                    profile={profile}
                  />
                )
              )}
            </>
          )}
          {error && (
            <h2 className="mt-3 text-center font-medium text-xl">
              No Blogs found !
            </h2>
          )}
        </div>
      </div>
    </>
  );
};

export default UserAllBlogs;
