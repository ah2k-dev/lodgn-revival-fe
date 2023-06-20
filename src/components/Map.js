import React from "react";
import GoogleMapReact from "google-map-react";
import mapMarker from "../assets/images/marker.svg";

const Marker = () => (
  <div style={{ color: "red", fontSize: "20px" }}>
    <img src={mapMarker} alt="map-marker" width={22} />
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
