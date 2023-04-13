import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/layout/Card";
import JobDetailsGrid from "../../components/layout/JobDetailsGrid";
import PaidPerNight from "../../components/layout/PaidPerNight";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { clearErrors, getOngoingRequests } from "../../actions/requestActions";

const ViewOngoingStays = () => {
  const dispatch = useDispatch();
  const { error, loading, onGoing } = useSelector((state) => state.request);
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
  }, [error]);

  const fetch = () => {
    dispatch(getOngoingRequests());
  };

  useEffect(() => {
    fetch();
  }, [dispatch]);
  return (
    <div className="min-vh-100 w-100 p-5">
      <div className="d-flex flex-column gap-5">
        <h2 className="font-poppins mt-4 heading-green">
          These are the current client stays
        </h2>
        <div className="d-flex flex-column gap-4 rounded-container bg-white p-5 position-relative">
          <div className="d-flex justify-content-between align-items-center">
            <JobDetailsGrid
              jobLocation="St Judes Hospital"
              jobAddress="Sarasota,FL. 33178"
              start_date={10}
              end_date={17}
              start_date_month="October"
              end_date_month="December"
              total_rooms={20}
              single_rooms={10}
              double_rooms={10}
            />
            <span>
              <span className="fs-5 font-poppins fst-italic green-span text-md font-poppins fw-normal d-flex flex-column align-items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="54"
                  height="59"
                  fill="none"
                  viewBox="0 0 54 59"
                >
                  <path
                    stroke="#85C371"
                    strokeLinecap="round"
                    strokeWidth="5"
                    d="M22.019 6.563c-2.264 2.82-7.426 15.41-9.962 43.202M38.32 3c-3.774 5.048-11.593 22.714-12.68 53M3 36.849c5.132-6.532 21.917-19.24 48-17.815"
                  ></path>
                </svg>
                Holiday Inn
              </span>
            </span>
          </div>
          <div className="d-flex justify-content-between">
            <PaidPerNight singles={120} doubles={145} />
            <span className="completed-status">COMPLETED</span>
          </div>
        </div>
        <div className="d-flex flex-column gap-4 rounded-container bg-white p-5 position-relative">
          <div className="d-flex justify-content-between align-items-center">
            <JobDetailsGrid
              jobLocation="Long Island"
              jobAddress="New York NY, 48765"
              start_date={23}
              end_date={17}
              start_date_month="November"
              end_date_month="December"
              total_rooms={35}
              single_rooms={5}
              double_rooms={30}
            />
            <span>
              <span className="fs-5 font-poppins fst-italic green-span p-4 text-md font-poppins fw-normal d-flex flex-column align-items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="144"
                  height="101"
                  fill="none"
                  viewBox="0 0 144 101"
                >
                  <path fill="url(#pattern0)" d="M0 0H144V101H0z"></path>
                  <defs>
                    <pattern
                      id="pattern0"
                      width="1"
                      height="1"
                      patternContentUnits="objectBoundingBox"
                    >
                      <use
                        transform="matrix(.00098 0 0 .0014 0 0)"
                        xlinkHref="#image0_6_2514"
                      ></use>
                    </pattern>
                    <image
                      id="image0_6_2514"
                      width="1024"
                      height="717"
                      xlinkHref="data:image/png;base64,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B/YNkT3NTe+9vq3F3I9Frv5RyVd7iGyvdWtn5sBXtKm/0ZPuLmtlNxAVs5H3/VOlq3Z+3j/w3KiuHeICP5EuVb3Y/jIxnyvszPceRNI7Dzb5vE+k6S8FtyY/N5R89Cqd940HkYrU9vRKG9uXyBG1rdSOX0k/CyxcN/kpv/fj8O8Vu/3bDzLMeyLn5p9byTyo7n+33OCJDD8Jl+dyuW+3FB6f/l95+LT1gZLXU+kbe/XVk9OZykHmPBERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERqSodUNYgW5PIYQ2fKOsXtiYRABARABARABARABARABARABARABARABARABCR3SUe5SsNAEQ/b24AIAIAACACAAAgAgAAIAIAACACAAAgAgAAIAIAthkRABARABARABARABARABARABARABARABARABB939hVu+ov4uCLopvjk/WV0hWAYPhbT0rzt/C/H5hnZvwkuU7sKnx28P/aNfYT0c3RLbng284BoEpmnHJmBgAAAAAQAAAAABAAAAAAEAAAAAAQAAAAABAAAAAAEAAAAAAQAAAAABAAAAAAkFNK1OVtVHqe9dVd0M1zpttFP39ddvTG/MuaAQAAIMmuSANQpnL4CtnRSxQMCgAAQAAAABz+BAAAQAAAAABAAAAAAEAAAAAAQAAAAABAAAAAAEAAAAAAQAAAAABAAAAAAEAAAAAAQAAAAABAAAAAAEAAoDsA2S65mgGAAODyAGBzAEAAAAAAQAAAAABAAAAAAEAAAAAAQAAAAABAAAAAAEAAAAAAQAAAAABAAAAAAEAAAAAAQAAAAABAAAAAAEAAAAAAQAAAAABAAAAAAEAAAAAAQAAAAABAAAAAAEAAAAAAQAAAAABAAAAAAEAAAAAc/gQAAEAAAAAAQAAAAABAAAAAAEAAAAAAQAAAAABAAAAAAEAAAAAAQGYKtZ52HwAAAABOX+jS2Hj/td3o1OuSkpLXM9HlGzv7mcHg5Zv1997vJD3DfbGc75+N3rIRruup2Hv6wg0AAPATAvDmqD7avJ7L85Kurx+m7g5dksm/Mp5+4su/+XM9u0/jAAAAPw0A8azr+XWRF5brSe6/cfbkH+ye6BVZ1b50tg0AAODSA/BmvyEstxU+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"
                    ></image>
                  </defs>
                </svg>
              </span>
            </span>
          </div>
          <div className="d-flex justify-content-between">
            <PaidPerNight singles={115} doubles={130} />
            <span className="completed-status">COMPLETED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOngoingStays;
