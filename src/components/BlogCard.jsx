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
        <div className="flex items-center flex-shrink-0 w-[60px] h-[60px]">
          <img
            src={
              profile
                ? profile
                : "https://wallpapers.com/images/hd/user-profile-placeholder-icon-jiv4adftoq5dhj54.jpg"
            }
            alt=""
            className="rounded-md object-cover"
          />
        </div>
        <div className="flex flex-col flex-grow">
          <h2 className="font-semibold text-xl w-[80%]">{title}</h2>
          <h2 className="text-gray-500 text-sm">
            {fullName} - {time}
          </h2>
        </div>
      </div>
      <div className="mt-2">{description}</div>
      {children}
    </div>
  );
};

export default BlogCard;
