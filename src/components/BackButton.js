import { Button } from "antd";
import React from "react";
// import { RiArrowGoBackLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Button className="backBtn d-flex justify-content-center align-items-center border-0 p-0 shadow-none" onClick={handleBack}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={20}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </Button>
  );
};

export default BackButton;
