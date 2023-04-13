import { Button, Upload } from 'antd'
import React from 'react'

const props = {
    action: '//jsonplaceholder.typicode.com/posts/',
    listType: 'picture',
    previewFile(file) {
        console.log('Your upload file:', file);
        // Your process logic. Here we just mock to the same file
        return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
            method: 'POST',
            body: file,
        })
            .then((res) => res.json())
            .then(({ thumbnail }) => thumbnail);
    },
};

const UpdateHotelDetails = () => {
    return (
        <div className='col-xl-3 col-12 update-hotel-details d-flex flex-column gap-3'>
            <div className='upload-hotel-image d-flex flex-column w-100 gap-2'>
                <label className='font-lato fw-semibold'>Upload hotel image.</label>
                <Upload {...props}>
                    <Button><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="31"
                        fill="none"
                        viewBox="0 0 48 31"
                    >
                        <mask id="path-1-inside-1_6_2634" fill="#fff">
                            <rect width="42.339" height="28.522" rx="0.987"></rect>
                        </mask>
                        <rect
                            width="42.339"
                            height="28.522"
                            stroke="#494949"
                            strokeWidth="2"
                            mask="url(#path-1-inside-1_6_2634)"
                            rx="0.987"
                        ></rect>
                        <path
                            fill="#494949"
                            d="M9.945 15.095l-9.747 5.88-.198.102V28.8l42.24-.102v-9.094l-8.825-9.044-15.17 10.416-8.3-5.881z"
                        ></path>
                        <circle cx="9.573" cy="7.007" r="4.046" fill="#494949"></circle>
                        <circle
                            cx="42.24"
                            cy="24.96"
                            r="5.28"
                            fill="#fff"
                            stroke="#494949"
                            strokeWidth="0.96"
                        ></circle>
                        <path
                            fill="#494949"
                            d="M41.944 27.876a.296.296 0 00.592 0h-.592zm.505-5.045a.296.296 0 00-.418 0l-1.885 1.884a.296.296 0 00.42.419l1.674-1.675 1.675 1.675a.296.296 0 00.419-.42l-1.885-1.883zm.087 5.045V23.04h-.592v4.836h.592z"
                        ></path>
                    </svg></Button>
                </Upload>
            </div>
            <div className='d-flex flex-column gap-2 w-100'>
                <label className='font-lato fw-semibold'>Add text description.</label>
                <input type='text' />
            </div>
            <div className='d-flex flex-column gap-2 w-100'>
                <label className='font-lato fw-semibold'>Add rates.</label>
                <input type='text' />
            </div>
            <div className='d-flex flex-column gap-2 w-100'>
                <label className='font-lato fw-semibold'>Add Payment Link.</label>
                <input type='text' />
            </div>
        </div>
    )
}

export default UpdateHotelDetails