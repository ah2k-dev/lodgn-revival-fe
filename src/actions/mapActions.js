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

export const setRoomRequirements = (roomRequirements) => async (dispatch) => {
    dispatch({
        type: mapConstants.SET_ROOM_REQUIREMENTS,
        payload: roomRequirements
    })
   
}

export const setDateRangeRedux = (dateRange) => async (dispatch) => {
    dispatch({
        type: mapConstants.SET_DATE_RANGE,
        payload: dateRange
    })
   
}

export const clearState = () => async (dispatch) => {
    dispatch({
        type: mapConstants.CLEAR_STATE
    })
   
}
