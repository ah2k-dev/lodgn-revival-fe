import React from 'react'
import Card from '../../components/layout/Card'
import JobDetailsGrid from '../../components/layout/JobDetailsGrid'
import ProgressBar from '../../components/layout/ProgressBar';

const CurrentRequest = () => {

  const request_status = 'payment verified';

  return (
    <div className='dashboard d-flex flex-column justify-content-between gap-5 align-items-start px-5 py-5'>
      <div className='d-flex flex-column justify-content-between w-100'>
        <h2 className='font-poppins mt-4'>
          You currently have 3 requests
        </h2>
        <div className="d-flex flex-column justify-content-between gap-5 w-100">
          <div className="rounded-container d-flex flex-column justify-content-center mt-3 gap-5 bg-white py-4 px-4">
            <div className="ps-4">
              <JobDetailsGrid jobLocation='St Judes Hospital' jobAddress='Sarasota,FL. 33178' start_date={10} end_date={17} start_date_month='October' end_date_month='December' total_rooms={20} single_rooms={10} double_rooms={10} />
            </div>
            <ProgressBar requestStatus={request_status} />
          </div>
        </div>
      </div>
      <div className="rounded-container d-flex flex-column justify-content-between bg-white p-5 gap-4 w-100">
        <div style={{ width: 'fit-content' }} className='row'>
          <div className='col-auto'>
            <JobDetailsGrid jobLocation='St Judes Hospital' jobAddress='Sarasota,FL. 33178' start_date={10} end_date={17} start_date_month='October' end_date_month='December' total_rooms={20} single_rooms={10} double_rooms={10} />
            <div className='mt-4'>
              <ProgressBar requestStatus={request_status} />
            </div>
          </div>
          {/* <span className='completed-status col-10 rounded-pill mt-4 py-2 px-4 text-white'>COMPLETED</span> */}
        </div>
        <div className='row mt-4 gap-0 justify-content-between'>
          <div className='col-auto position-relative'>
            <span className='rare-find-badge'>Rare Find</span>
            <Card svgTxt='Holiday Inn' distance={1.5} singlePrice={120} doublePrice={145} />
          </div>
          <div className='col-auto'>
            <Card svgTxt='Holiday Inn' distance={1.5} singlePrice={120} doublePrice={145} />
          </div>
          <div className='col-auto'>
            <Card svgTxt='Holiday Inn' distance={1.5} singlePrice={120} doublePrice={145} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentRequest
