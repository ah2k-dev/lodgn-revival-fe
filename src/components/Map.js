import React from "react";
import GoogleMapReact from "google-map-react";

const Marker = ({ text, color }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "25px",
      height: "25px",
      borderRadius: "50%",
      backgroundColor: color,
      color: "white",
      fontWeight: "bold",
      fontSize: "16px",
    }}
  >
    {text}
  </div>
);
const Marker2 = () => (
  <div style={{ color: "red", fontSize: "20px" }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="red"
      viewBox="0 0 24 24"
      strokeWidth={0.2}
      stroke="black"
      width={35}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
      <path
        strokeLinecap="round"
        fill="white"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  </div>
);
const Map = ({ hotels, center }) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyC7-xAxxhgl4VQLTURgqKdFlXrsiff4GUM" }}
      center={
        center.lat !== "" ? center : { lat: 40.7127753, lng: -74.0059728 }
      }
      defaultZoom={12}
      draggable={false}
      options={{
        zoomControl: false,
        fullscreenControl: false,
        keyboardShortcuts: false,
      }}
    >
      {hotels?.map((hotel, index) => (
        <Marker2
          key={hotel.place_id}
          lat={hotel.geometry.location.lat()}
          lng={hotel.geometry.location.lng()}
          text={index + 1}
          color="green"
        />
      ))}
    </GoogleMapReact>
  );
};

export default Map;
