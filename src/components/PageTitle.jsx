import React from "react";

const PageTitle = ({userObject,pageTitle}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">{pageTitle}</h1>
        <div className="flex items-center gap-3">
          <img
            src={userObject.profileUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-gray-700">{userObject.userName}</span>
        </div>
      </div>
      
    </>
  );
};

export default PageTitle;
