import React from "react";
import BackButton from "../components/BackButton";

const NotFound = () => {
  return (
    <div className="page-not-found d-flex align-items-center justify-content-center flex-column min-vh-100">
      <div className="container">
        <div className="px-lg-5 py-2 d-flex align-items-center justify-content-center flex-column gap-3">
          <h1 className="font-poppins fw-bold text-uppercase">
            404 - Page Not Found
          </h1>
          <span className="font-poppins text-center px-5">
            The path you are trying to access is not found or you don't have the
            permissions to view it.
          </span>
          <BackButton />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
