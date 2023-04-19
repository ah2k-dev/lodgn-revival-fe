import React from 'react'

const PaidPerNight = ({singles, doubles, animals}) => {
    return (
        <>
            <span style={{ color: '#959595', fontSize: 18 }} className='d-flex flex-md-row flex-column align-items-center gap-3 font-poppins'>
                <span>Paid per night:</span>
                <span>Singles: ${singles}</span>
                <span>Doubles: ${doubles}</span>
                <span>Animals: ${animals}</span>
            </span>
        </>
    )
}

export default PaidPerNight
