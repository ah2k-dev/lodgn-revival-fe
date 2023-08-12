import React from "react";

const JobDetailsGrid = ({
  jobLocation,
  jobAddress,
  start_date,
  start_date_month,
  end_date,
  end_date_month,
  total_rooms,
  single_rooms,
  double_rooms,
  animalSupport,
  user,
}) => {
  return (
    <>
      <div className="details flex-wrap gap-3">
        <div className="detail">
          <span className="title location-title">{jobLocation}</span>
          <span className="description">{jobAddress}</span>
        </div>
        <div className="detail flex justify-content-center">
          <div>
            <span className="title">{start_date}</span>
            <span className="description">{start_date_month}</span>
          </div>
          <span className="title">-</span>
          <div>
            <span className="title">{end_date}</span>
            <span className="description">{end_date_month}</span>
          </div>
        </div>
        <div className="detail">
          <span className="title">
            {total_rooms > 1 ? total_rooms + " Rooms" : total_rooms + " Room"}
          </span>
          <span className="description">
            {single_rooms > 0 ? single_rooms + " Singles" : null}{" "}
            {single_rooms > 0 && double_rooms > 0 ? ", " : null}{" "}
            {double_rooms > 0 ? +double_rooms + " Doubles" : null}{" "}
            {animalSupport ? ", " + animalSupport + " Animal Support" : null}
          </span>
        </div>
        <div className="detail">
          <span className="title">Username</span>
          <span className="description">
            {!user?.firstname && !user.lastname
              ? "N/A"
              : `${user?.firstname} ${user?.lastname}`}
          </span>
        </div>
        <div className="detail">
          <span className="title">Company</span>
          <span className="description">{user?.company || "N/A"}</span>
        </div>
        <div className="detail">
          <span className="title">Phone no.</span>
          <span className="description">{user?.phone || "N/A"}</span>
        </div>
      </div>
    </>
  );
};

export default JobDetailsGrid;
