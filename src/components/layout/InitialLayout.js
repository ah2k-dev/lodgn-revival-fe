import React, { createContext, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export const HeaderHeightContext = createContext();

const InitialLayout = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    const headerElement = headerRef.current;
    if (headerElement) {
      const height = headerElement.offsetHeight;
      setHeaderHeight(height);
    }
  }, []);

  return (
    <HeaderHeightContext.Provider value={headerHeight}>
      <div>
        <Header ref={headerRef} />
        <Outlet />
      </div>
    </HeaderHeightContext.Provider>
  );
};

export default InitialLayout;
