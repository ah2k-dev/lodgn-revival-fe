import React from 'react';

const UrgentBookingModal = ({ setShowModal }) => {

    return (
        <div className="modal d-flex justify-content-center align-items-center">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Urgent Booking</h3>
                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <h5 className="text-capitalize">For urgent today's date booking please contact us on our Number 786-874 9988</h5>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UrgentBookingModal