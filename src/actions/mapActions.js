import { mapConstants } from "../constants/mapConstants"

export const setCenterData = (center) => async (dispatch) => {
    dispatch({
        type: mapConstants.SET_CENTER,
        payload: center
    })
   
}

export const setHotelsData = (hotels) => async (dispatch) => {
    dispatch({
        type: mapConstants.SET_HOTELS,
        payload: hotels
    })
   
}