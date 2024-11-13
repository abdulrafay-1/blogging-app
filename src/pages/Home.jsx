import React, { useEffect, useState } from "react";
import getAllDocs from "../utils/getAllDocs";
import Loader from "../components/Loader";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

const Home = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        setLoading(true);
        setError(false);
        const respose = await getAllDocs("blogs");
        setAllBlogs(respose);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getAllBlogs();
  }, []);

  return (
    <>
      <div>
        <h1 className="py-5 shadow-sm px-2 text-2xl bg-white font-semibold">
          Good Morning Readers 🖐
        </h1>
        <h2 className="text-xl px-2 py-2 font-medium">All Blogs</h2>
      </div>
      {loading && (
        <div className="text-center">
          <Loader />
        </div>
      )}
      {error && (
        <h2 className="text-red-500 text-xl font-medium underline text-center">
          {error}
        </h2>
      )}
      <div className="flex flex-col flex-grow items-center ">
        <div className="flex flex-col gap-2 w-full md:w-[580px] my-2">
          {allBlogs.length > 0 &&
            allBlogs.map(
              ({ title, description, time, fullName, docId, uid, profile }) => (
                <BlogCard
                  key={docId}
                  title={title}
                  description={description}
                  time={time}
                  fullName={fullName}
                  profile={profile}
                >
                  <Link to={`/user/${uid}`}>
                    <p className="text-sm text-primary cursor-pointer hover:underline">
                      See all from this user
                    </p>
                  </Link>
                </BlogCard>
              )
            )}
        </div>
      </div>
    </>
  );
};

export default Home;
