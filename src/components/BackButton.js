import { Button } from "antd";
import React from "react";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Button className="backBtn d-flex justify-content-center align-items-center py-4 px-4" onClick={handleBack}>
      <RiArrowGoBackLine />
    </Button>
  );
};

export default BackButton;
