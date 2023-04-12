import custAxios from "../services/axiosConfig";
import { requestConstants } from "../constants/requestConstants";
import { message } from "antd";
import { attachToken } from "../services/axiosConfig";

export const createRequest = (data) => async (dispatch) => {
  dispatch({
    type: requestConstants.CREATE_REQUEST_REQUEST,
  });
  try {
    attachToken();
    const res = await custAxios.post("/requests/create", data);
    if (res) {
      dispatch({
        type: requestConstants.CREATE_REQUEST_SUCCESS,
        payload: res.data.data,
      });
      message.success({
        content: "Request Created Successfully",
        style: {
          marginTop: "10vh",
        },
      });
      dispatch(getRequests());
      return true;
    }
    return true;
  } catch (error) {
    dispatch({
      type: requestConstants.CREATE_REQUEST_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
  }
};

export const getOneRequest = (id) => async (dispatch) => {
  dispatch({
    type: requestConstants.GET_ONE_REQUEST_REQUEST,
  });
  try {
    attachToken();
    const res = await custAxios.get(`/requests/${id}`);
    dispatch({
      type: requestConstants.GET_ONE_REQUEST_SUCCESS,
      payload: res.data.data.request,
    });
  } catch (error) {
    dispatch({
      type: requestConstants.GET_ONE_REQUEST_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
  }
};

export const getRequests = () => async (dispatch) => {
  dispatch({
    type: requestConstants.GET_REQUESTS_REQUEST,
  });
  try {
    attachToken();
    const res = await custAxios.get("/requests");
    dispatch({
      type: requestConstants.GET_REQUESTS_SUCCESS,
      payload: res.data.data.requests,
    });
  } catch (error) {
    dispatch({
      type: requestConstants.GET_REQUESTS_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
  }
};

export const updateRequest = (id, data) => async (dispatch) => {
  dispatch({
    type: requestConstants.UPDATE_REQUEST_REQUEST,
  });
  try {
    attachToken();
    const res = await custAxios.put(`/requests/${id}`, data);
    if (res) {
      dispatch({
        type: requestConstants.UPDATE_REQUEST_SUCCESS,
        payload: res.data.data,
      });
      message.success({
        content: "Request Updated Successfully",
        style: {
          marginTop: "10vh",
        },
      });
      dispatch(getOneRequest(id));
      return true;
    }
    return true;
  } catch (error) {
    dispatch({
      type: requestConstants.UPDATE_REQUEST_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
  }
};

export const deleteRequest = (id) => async (dispatch) => {
  dispatch({
    type: requestConstants.DELETE_REQUEST_REQUEST,
  });
  try {
    attachToken();
    const res = await custAxios.delete(`/requests/${id}`);
    if (res) {
      dispatch({
        type: requestConstants.DELETE_REQUEST_SUCCESS,
        payload: res.data.data,
      });
      message.success({
        content: "Request Deleted Successfully",
        style: {
          marginTop: "10vh",
        },
      });
      dispatch(getRequests());
      return true;
    }
    return true;
  } catch (error) {
    dispatch({
      type: requestConstants.DELETE_REQUEST_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
  }
};

export const changeStatus = (id, data) => async (dispatch) => {
  dispatch({
    type: requestConstants.CHANGE_STATUS_REQUEST,
  });
  try {
    attachToken();
    const res = await custAxios.put(`/requests/${id}/status`, data);
    if (res) {
      dispatch({
        type: requestConstants.CHANGE_STATUS_SUCCESS,
        payload: res.data.data,
      });
      message.success({
        content: "Status Changed Successfully",
        style: {
          marginTop: "10vh",
        },
      });
      dispatch(getRequests());
      return true;
    }
    return true;
  } catch (error) {
    dispatch({
      type: requestConstants.CHANGE_STATUS_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
  }
};

export const getOngoingRequests = () => async (dispatch) => {
  dispatch({
    type: requestConstants.GET_ONGOING_REQUESTS_REQUEST,
  });
  try {
    attachToken();
    const res = await custAxios.get("/requests/ongoing");
    dispatch({
      type: requestConstants.GET_ONGOING_REQUESTS_SUCCESS,
      payload: res.data.data.requests,
    });
  } catch (error) {
    dispatch({
      type: requestConstants.GET_ONGOING_REQUESTS_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: requestConstants.CLEAR_ERRORS,
  });
};
