import React from "react";
import BackButton from "../components/BackButton";

const NotFound = () => {
  return (
    <div className="page-not-found d-flex align-items-start flex-column min-vh-100">
      <div className="px-4 py-2 d-flex align-items-start flex-column gap-3">
        <h1 className="fs-1 font-poppins text-uppercase">
          404 - Page Not Found
        </h1>
        <span className="font-poppins">
          The path you are trying to access is not found or you don't have the
          permissions to view it.
        </span>
        <BackButton />
      </div>
    </div>
  );
};

export default NotFound;
