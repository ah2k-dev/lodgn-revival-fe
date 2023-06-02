import React, { useState } from "react";

const UrgentBookingModal = ({ showModal, setShowModal }) => {
  const [animation, setAnimation] = useState(showModal);

  const handleClose = () => {
    setAnimation(false);

    setTimeout(() => {
      setShowModal(false);
    }, 600);
  };

  return (
    <div
      className={`modal ${
        animation === true ? "in" : "out"
      } d-flex justify-content-center align-items-center`}
    >
      <div
        className={`modal-dialog fade-scale ${
          animation === true ? "in" : "out"
        }`}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">Urgent Booking</h3>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <h5 className="text-capitalize">
              For urgent same day bookings, please contact us directly at
              ###-###-###
            </h5>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrgentBookingModal;
