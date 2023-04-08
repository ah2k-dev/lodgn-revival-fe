import React from 'react'

const PaidPerNight = ({singles, doubles}) => {
    return (
        <>
            <span style={{ color: '#959595', fontSize: 18 }} className='d-flex gap-3 font-poppins'>
                <span>Paid per night:</span>
                <span>Singles: ${singles}</span>
                <span>Doubles: ${doubles}</span>
            </span>
        </>
    )
}

export default PaidPerNight
