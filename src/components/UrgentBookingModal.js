import { Modal } from "antd";
import React from "react";

const UrgentBookingModal = ({ showModal, setShowModal }) => {
  const handleOk = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal
        title="Urgent Booking"
        open={showModal}
        onOk={handleOk}
        cancelText={[]}
        onCancel={handleOk}
        centered
      >
        <h5 className="text-capitalize">
          For urgent same day bookings, please contact us directly at
          ###-###-###
        </h5>
      </Modal>
    </>
  );
};

export default UrgentBookingModal;
