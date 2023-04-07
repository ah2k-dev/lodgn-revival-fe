import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from './Footer'

const InitialLayout = () => {
  return (
    <div>
      <Header />
        <Outlet />
      <Footer />
    </div>
  );
};

export default InitialLayout;
