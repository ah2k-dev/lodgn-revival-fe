import React from 'react'

const ProgressBar = ({requestStatus}) => {

    var progressBarColor;
    var progressPercent;
    var progressTextColor = 'white';

    // status conditions 
    if (requestStatus === 'received') {
        progressBarColor = '#FDF307';
        progressTextColor = '#959595';
        progressPercent = 25
    } else if (requestStatus === 'negotiating') {
        progressBarColor = '#07A4FD';
        progressPercent = 50
    } else if (requestStatus === 'completed') {
        progressBarColor = '#44A16F';
        progressPercent = 75
    } else if (requestStatus === 'payment verified') {
        progressBarColor = '#44A16F';
        progressPercent = 100
    }


    return (
        <div style={{ border: progressPercent === 100 ? 0 : '1px solid #959595' }} className="status row position-relative justify-content-center">
            <div class="progress position-absolute justify-content-start px-0">
                <div class="progress-bar justify-content-center align-items-start px-3 text-uppercase font-lato fw-semibold border-0" role="progressbar" style={{ width: `${progressPercent + 3}%`, backgroundColor: progressBarColor, color: progressTextColor }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{requestStatus}</div>
            </div>
            <div className="col-3 d-flex align-items-center py-2">
                <span>
                    RECEIVED
                </span>
            </div>
            <div className="col-3 d-flex align-items-center py-2">
                <span>
                    NEGOTIATING
                </span>
            </div>
            <div className="col-3 d-flex align-items-center py-2">
                <span>
                    COMPLETED
                </span>
            </div>
            <div className="col-3 d-flex align-items-center py-2">
                <span>
                    PAYMENT VERIFIED
                </span>
            </div>
        </div>
    )
}

export default ProgressBar
