import { message } from "antd";
import { userConstants } from "../constants/userConstaants";
import custAxios, { attachToken } from "../services/axiosConfig";

export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: userConstants.FETCH_USERS_REQUEST });
  try {
    attachToken();
    const res = await custAxios.get("/user/all");
    if (res) {
      dispatch({
        type: userConstants.FETCH_USERS_SUCCESS,
        payload: res.data,
      });
    }
  } catch (error) {
    dispatch({
      type: userConstants.FETCH_USERS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const fetchPersonalInfo = () => async (dispatch) => {
  dispatch({ type: userConstants.FETCH_PERSONAL_INFO_REQUEST });
  try {
    attachToken();
    const res = await custAxios.get("/user/me");
    if (res) {
      dispatch({
        type: userConstants.FETCH_PERSONAL_INFO_SUCCESS,
        payload: res.data,
      });
    }
  } catch (error) {
    dispatch({
      type: userConstants.FETCH_PERSONAL_INFO_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const createModerator = (moderator) => async (dispatch) => {
  dispatch({ type: userConstants.CREATE_MODERATOR_REQUEST });
  try {
    attachToken();
    const res = await custAxios.post("/user/createModerator", moderator);
    if (res) {
      dispatch({
        type: userConstants.CREATE_MODERATOR_SUCCESS,
      });
      message.success({
        content: "Moderator created successfully",
        style: {
          marginTop: "20vh",
        },
      });
      return true;
    }
  } catch (error) {
    dispatch({
      type: userConstants.CREATE_MODERATOR_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const updatePersonalInfo = (personalInfo) => async (dispatch) => {
  dispatch({ type: userConstants.UPDATE_PERSONAL_INFO_REQUEST });
  try {
    attachToken();
    const res = await custAxios.put("/user/me", personalInfo);
    if (res) {
      dispatch({
        type: userConstants.UPDATE_PERSONAL_INFO_SUCCESS,
      });
      message.success({
        content: "Personal info updated successfully",
        style: {
          marginTop: "20vh",
        },
      });
      return true;
    }
  } catch (error) {
    dispatch({
      type: userConstants.UPDATE_PERSONAL_INFO_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const updateModerator = (moderator) => async (dispatch) => {
  dispatch({ type: userConstants.UPDATE_MODERATOR_REQUEST });
  try {
    attachToken();
    const res = await custAxios.put("/user/moderator", moderator);
    if (res) {
      dispatch({
        type: userConstants.UPDATE_MODERATOR_SUCCESS,
      });
      message.success({
        content: "Moderator updated successfully",
        style: {
          marginTop: "20vh",
        },
      });
      return true;
    }
  } catch (error) {
    dispatch({
      type: userConstants.UPDATE_MODERATOR_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const blockUnblockUser = (userId) => async (dispatch) => {
  dispatch({ type: userConstants.BLOCKUNBLOCK_USER_REQUEST });
  try {
    attachToken();
    const res = await custAxios.put(`/user/${userId}`);
    if (res) {
      dispatch({
        type: userConstants.BLOCKUNBLOCK_USER_SUCCESS,
      });
      message.success({
        content: "User blocked/unblocked successfully",
        style: {
          marginTop: "20vh",
        },
      });
      return true;
    }
  } catch (error) {
    dispatch({
      type: userConstants.BLOCKUNBLOCK_USER_FAILURE,
      payload: error.response.data.message,
    });
  }
};
