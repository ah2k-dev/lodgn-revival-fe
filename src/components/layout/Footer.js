import { Row, message, Button } from "antd";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { clearErrors, createRequest } from "../../actions/requestActions";
import { clearState } from "../../actions/mapActions";
import { useDispatch, useSelector } from "react-redux";

const Footer = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.request);

  useEffect(() => {
    if (error) {
      message.error({
        content: error,
        style: {
          marginTop: "10vh",
        },
      });
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  const { hotels, center, roomRequirements, dateRange } = useSelector(
    (state) => state.map
  );

  const totalRooms = roomRequirements.single + roomRequirements.double;

  return (
    <footer
      className={
        location.pathname === "/dashboard/user"
          ? "footer-container w-100 ms-auto"
          : "footer-container w-100 ms-0"
      }
    >
      <Row justify="space-between" align="start">
        <div className="details col-md-7 col-12 d-flex justify-content-start">
          {center?.string && (
            <div className="detail pl-0">
              <span className="title location-title">{center?.string}</span>
              <span className="description">{`${center?.state}, ${center?.zipCode ? center?.zipCode : "N/A"}`}</span>
            </div>
          )}
          <div className="detail flex">
            {dateRange.length > 0 && (
              <div>
                <span className="title">
                  {dateRange[0] !== null
                    ? moment(dateRange[0]).format("DD")
                    : ""}
                </span>
                <span className="description">
                  {dateRange[0] !== null
                    ? moment(dateRange[0]).format("MMMM")
                    : ""}
                </span>
              </div>
            )}
            {dateRange.length > 0 && dateRange[1] !== null ? (
              <span className="title">-</span>
            ) : null}
            {dateRange.length > 0 && (
              <div>
                <span className="title">
                  {dateRange[1] !== null
                    ? moment(dateRange[1]).format("DD")
                    : ""}
                </span>
                <span className="description">
                  {dateRange[1] !== null
                    ? moment(dateRange[1]).format("MMM")
                    : ""}
                </span>
              </div>
            )}
          </div>
          {totalRooms > 0 && (
            <div className="detail">
              <span className="title">{totalRooms} Rooms</span>
              <span className="description">
                {roomRequirements.single > 0
                  ? roomRequirements.single + " Singles"
                  : null}
                {roomRequirements.single > 0 && roomRequirements.double > 0
                  ? ", "
                  : null}
                {roomRequirements.double > 0
                  ? roomRequirements.double + " Doubles"
                  : null}
                {roomRequirements.animalSupport > 0
                  ? ", " + roomRequirements.animalSupport + " Animal Support"
                  : null}
              </span>
            </div>
          )}
        </div>
        <div className="col-auto footer-btn">
          <Button
            disabled={center.search === "" || totalRooms === 0}
            loading={loading}
            className="px-3 confirm-btn"
            onClick={
              location.pathname === "/"
                ? () => {
                    navigate("/auth", {
                      state: {
                        location: center,
                        dateRange,
                        roomRequirements,
                      },
                    });
                    dispatch(clearState());
                  }
                : () => {
                    const res = dispatch(
                      createRequest({
                        location: center,
                        dateRange,
                        roomRequirements,
                      })
                    );
                    if (res) {
                      navigate("/dashboard/user/current-requests");
                    }
                  }
            }
          >
            Confirm and request
          </Button>
        </div>
      </Row>
    </footer>
  );
};

export default Footer;
