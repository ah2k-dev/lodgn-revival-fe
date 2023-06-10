import React from "react";

const PaidPerNight = ({ singles, doubles, animals }) => {
  return (
    <>
      <span
        style={{ color: "#959595", fontSize: 18 }}
        className="d-flex flex-md-row flex-column align-items-center gap-3 font-poppins"
      >
        <span>Paid per night:</span>
        {singles ? <span>Singles: ${singles}</span> : null}
        {doubles ? <span>Doubles: ${doubles}</span> : null}
        {animals ? <span>Animals: ${animals}</span> : null}
      </span>
    </>
  );
};

export default PaidPerNight;
