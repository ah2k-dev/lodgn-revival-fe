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
    console.log("getting requests");
    attachToken();
    console.log("getting requests");
    const res = await custAxios.get("/requests/get");
    dispatch({
      type: requestConstants.GET_REQUESTS_SUCCESS,
      payload: res.data.data.requests,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: requestConstants.GET_REQUESTS_FAILURE,
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
    const res = await custAxios.put(`/requests/status/${id}`, data);
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
      if(data.selectedOffer && data.selectedOffer !== ""){
        dispatch(bookOffer(id, data.selectedOffer));
      }
      return true;
    }
    return true;
  } catch (error) {
    dispatch({
      type: requestConstants.CHANGE_STATUS_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
    message.error({
      content: error.response.data.message || "Server Error",
      style: {
        marginTop: "10vh",
      },
    });
    dispatch(clearErrors());
  }
};

export const getOngoingRequests = () => async (dispatch) => {
  dispatch({
    type: requestConstants.GET_ONGOING_REQUESTS_REQUEST,
  });
  try {
    attachToken();
    const res = await custAxios.get("/requests/getOngoing");
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

export const bookOffer = (request, offering) => async (dispatch) => {
  dispatch({
    type: requestConstants.BOOK_OFFER_REQUEST,
  });
  try {
    attachToken();
    const res = await custAxios.post("/booking/bookOffer", {
      requestId: request,
      offering,
    });
    if (res) {
      dispatch({
        type: requestConstants.BOOK_OFFER_SUCCESS,
        payload: res.data.data,
      });
      message.success({
        content: "Offer Booked Successfully",
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
      type: requestConstants.BOOK_OFFER_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
  }
};

export const getPreviousStays = () => async (dispatch) => {
  dispatch({
    type: requestConstants.GET_PREVIOUS_STAYS_REQUEST,
  });
  try {
    attachToken();
    const res = await custAxios.get("/requests/getPreviousStays");
    dispatch({
      type: requestConstants.GET_PREVIOUS_STAYS_SUCCESS,
      payload: res.data.data.stays,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: requestConstants.GET_PREVIOUS_STAYS_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
  }
};

export const updateRequest = (data) => async (dispatch) => {
  dispatch({
    type: requestConstants.UPDATE_REQUEST_REQUEST,
  });
  try {
    // console.log(data);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    attachToken();
    const res = await custAxios.post(`/booking/requestUpdate`, data, config);
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
      // dispatch(getOneRequest(id));
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

export const approveRejectUpdate = (data) => async (dispatch) => {
  dispatch({
    type: requestConstants.APPROVE_REJECT_UPDATE_REQUEST,
  });
  try {
    attachToken();
    const res = await custAxios.put(`/booking/approveRejectUpdate`, data);
    if (res) {
      dispatch({
        type: requestConstants.APPROVE_REJECT_UPDATE_SUCCESS,
        payload: res.data.data,
      });
      message.success({
        content: "Request Updated Successfully",
        style: {
          marginTop: "10vh",
        },
      });
      dispatch(getRequestUpdates());
      return true;
    }
    // return true;
  } catch (error) {
    dispatch({
      type: requestConstants.APPROVE_REJECT_UPDATE_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
  }
};

export const getRequestUpdates = () => async (dispatch) => {
  dispatch({
    type: requestConstants.GET_REQUEST_UPDATES_REQUEST,
  });
  try {
    attachToken();
    const res = await custAxios.get(`/booking/getRequestUpdates`);
    if (res) {
      dispatch({
        type: requestConstants.GET_REQUEST_UPDATES_SUCCESS,
        payload: res.data.data.updates,
      });
      // message.success({
      //   content: "Request Updated Successfully",
      //   style: {
      //     marginTop: "10vh",
      //   },
      // });
      // dispatch(getOneRequest(id));
      return true;
    }
    // return true;
  } catch (error) {
    dispatch({
      type: requestConstants.GET_REQUEST_UPDATES_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
  }
};

export const getRejectedReuests = () => async (dispatch) => {
  dispatch({
    type: requestConstants.GET_REJECTED_REQUESTS_REQUEST,
  });
  try {
    attachToken();
    const res = await custAxios.get(`/requests/getRejected`);
    if (res) {
      dispatch({
        type: requestConstants.GET_REJECTED_REQUESTS_SUCCESS,
        payload: res.data.data.requests,
      });
      // message.success({
      //   content: "Request Updated Successfully",
      //   style: {
      //     marginTop: "10vh",
      //   },
      // });
      // dispatch(getOneRequest(id));
      return true;
    }
    // return true;
  } catch (error) {
    dispatch({
      type: requestConstants.GET_REJECTED_REQUESTS_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
  }
};

export const rejectReuest = (id) => async (dispatch) => {
  dispatch({
    type: requestConstants.REJECT_REQUEST_REQUEST,
  });
  try {
    attachToken();
    const res = await custAxios.put(`/requests/reject/${id}`);
    if (res) {
      dispatch({
        type: requestConstants.REJECT_REQUEST_SUCCESS,
        payload: res.data.data,
      });
      message.success({
        content: "Request Rejected Successfully",
        style: {
          marginTop: "10vh",
        },
      });
      dispatch(getRequests());
      return true;
    }
    // return true;
  } catch (error) {
    dispatch({
      type: requestConstants.REJECT_REQUEST_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
  }
};

export const fetchReports = () => async (dispatch) => {
  dispatch({
    type: requestConstants.GET_REPORTS_REQUEST,
  });
  try {
    attachToken();
    const res = await custAxios.get(`/booking/getReports`);
    if (res) {
      dispatch({
        type: requestConstants.GET_REPORTS_SUCCESS,
        payload: res.data.data.response,
      });
      // message.success({
      //   content: "Request Updated Successfully",
      //   style: {
      //     marginTop: "10vh",
      //   },
      // });
      // dispatch(getOneRequest(id));
      return true;
    }
    // return true;
  } catch (error) {
    dispatch({
      type: requestConstants.GET_REPORTS_FAILURE,
      payload: error.response.data.message || "Server Error",
    });
  }
};


export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: requestConstants.CLEAR_ERRORS,
  });
};
