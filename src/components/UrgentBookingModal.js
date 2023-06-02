import { Modal } from "antd";
import React, { useState } from "react";

const UrgentBookingModal = ({ showModal, setShowModal }) => {
  const handleOk = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
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
