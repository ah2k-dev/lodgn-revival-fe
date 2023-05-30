import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineHome } from "react-icons/ai";

const DashboardButton = () => {
  const { user, isAuthentiated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleClick = () => {
    if (user.userData) {
      if (user.userData.role === "admin" || user.userData.role === "moderator") {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard/user");
      }
    }
  };
  return (
    
      <Button className="backBtn" style={{
        top: "10vh !important",
      }} onClick={handleClick}>
        <AiOutlineHome />
      </Button>
    
  );
};

export default DashboardButton;
