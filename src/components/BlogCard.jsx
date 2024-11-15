import React from "react";

const BlogCard = ({
  title,
  time,
  fullName,
  description,
  children,
  profile,
}) => {
  return (
    <div className="rounded-md w-full border bg-white border-gray-300 shadow-lg p-3">
      <div className="flex items-center gap-2">
        <div className="h-[70px] flex-shrink-0 w-[70px] overflow-hidden rounded-md ">
          <img
            src={profile}
            alt=""
            className="rounded-md  h-full w-full object-cover"
          />
        </div>
        <div className="">
          <h2 className="font-semibold text-xl md:w-[85%]">{title}</h2>
          <h2 className="text-gray-500 text-sm">
            {fullName} - {new Date(time).toDateString()}
          </h2>
        </div>
      </div>
      <div className="mt-2">{description}</div>
      {children}
    </div>
  );
};

export default BlogCard;
