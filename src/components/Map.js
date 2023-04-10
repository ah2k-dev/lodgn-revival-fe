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
const Marker2 = () => <div style={{ color: "red", fontSize: "20px" }}>📍</div>;
const Map = ({hotels, center}) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyC7-xAxxhgl4VQLTURgqKdFlXrsiff4GUM" }}
      center={center}
      defaultZoom={15}
      draggable={false}
    >
      <Marker2
        lat={center?.lat}
        lng={center?.lng}
        text="You are here"
        color="blue"
      />
      {hotels?.map((hotel, index) => (
        <Marker
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
