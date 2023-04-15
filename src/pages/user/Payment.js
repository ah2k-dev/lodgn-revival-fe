import React from "react";

const Payment = () => {
  return (
    <div className="payment row min-vh-100">
      <div className="d-flex flex-column justify-content-between shadow col-6 payment-left-column">
        <h1 className="text-2xl fst-italic p-4 fw-bold">LODGN</h1>
        <div className="d-flex flex-column align-items-center px-3">
          <div>
            <div className="hotel-img shadow d-flex flex-column align-items-center justify-content-center">
              <svg
                width="104"
                height="113"
                viewBox="0 0 104 113"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M42.2453 11.9244C37.8113 17.4062 27.7019 41.8723 22.7358 95.8824M74.1698 5C66.7799 14.8095 51.4679 49.1429 49.3396 108M5 70.7815C15.0503 58.0868 47.9208 33.3899 99 36.1597"
                  stroke="#5BA343"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-poppin fst-italic fs-4 mt-2">
                Holiday Inn
              </span>
            </div>
            <span>
              <h3 className="hotel-name mt-4">St Judes Hospital</h3>
              <span className="hotel-address">Sarasota,FL. 33178</span>
            </span>
            <div className="mt-5 hotel-details">
              <span className="nights">
                <span className="font-lato fw-bold fs-6">60 nights</span>
                <span className="ms-3 rare-badge font-poppins text-white px-3 py-2">
                  Rare Find
                </span>
              </span>
            </div>
            <span className="d-flex flex-column mt-2 font-lato fw-bold fs-6">
              <span>10 Single Rooms: $120 x 60</span>
              <span>10 Double Rooms: $145 x 60</span>
            </span>
            <span className="mt-5 d-flex flex-column">
              <span className="font-lato fw-bold fs-6">
                Total amount to be paid:
              </span>
              <span className="total fs-2 font-lato fw-bold">$275</span>
            </span>
          </div>
        </div>
        <span className="d-flex gap-2 px-3 my-5 fw-bold fs-5">
          <span>Powered by Stripe</span>
          <span className="fs-4" style={{ marginTop: -4, color: "#0000004D" }}>
            |
          </span>
          <span>Terms</span>
          <span>Privacy</span>
        </span>
      </div>
      <div className="col-6 d-flex align-items-center justify-content-center">
        <span className="fs-2 fw-bold font-poppins">
          Here goes strip payment form.
        </span>
      </div>
    </div>
  );
};

export default Payment;
