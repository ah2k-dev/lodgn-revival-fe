import React, { useContext, useEffect, useRef, useState } from "react";
import Map from "../components/Map";
import { useSelector } from "react-redux";
import Footer from "../components/layout/Footer";
import { HeaderHeightContext } from "../components/layout/InitialLayout";

const LandingPage = () => {
  const footerRef = useRef();
  const headerHeight = useContext(HeaderHeightContext);
  const footerHeight = footerRef.current?.offsetHeight;
  const [containerHeight, setContainerHeight] = useState("100vh");

  useEffect(() => {
    const newHeight = `calc(98.6vh - ${headerHeight}px - ${footerHeight}px)`;
    setContainerHeight(newHeight);
  }, [headerHeight, footerHeight]);

  const { hotels, center } = useSelector((state) => state.map);

  return (
    <div className="landing-page">
      <div className="map-container" style={{ height: containerHeight }}>
        <Map hotels={hotels} center={center} />
      </div>
      <Footer ref={footerRef} />
    </div>
  );
};

export default LandingPage;
