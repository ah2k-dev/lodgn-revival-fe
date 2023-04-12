import { requestConstants } from "../constants/requestConstants";

const initialState = {
  requests: [],
  onGoing: [],
  request: {},
  loading: false,
  error: null,
};

export const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case requestConstants.CREATE_REQUEST_REQUEST:
    case requestConstants.GET_ONE_REQUEST_REQUEST:
    case requestConstants.GET_REQUESTS_REQUEST:
    case requestConstants.UPDATE_REQUEST_REQUEST:
    case requestConstants.DELETE_REQUEST_REQUEST:
    case requestConstants.GET_ONGOING_REQUESTS_REQUEST:
    case requestConstants.CHANGE_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case requestConstants.CREATE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case requestConstants.GET_ONE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        request: action.payload,
      };
    case requestConstants.GET_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        requests: action.payload,
      };
    case requestConstants.UPDATE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case requestConstants.DELETE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case requestConstants.GET_ONGOING_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        onGoing: action.payload,
      };

    case requestConstants.CHANGE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case requestConstants.CREATE_REQUEST_FAILURE:
    case requestConstants.GET_ONE_REQUEST_FAILURE:
    case requestConstants.GET_REQUESTS_FAILURE:
    case requestConstants.UPDATE_REQUEST_FAILURE:
    case requestConstants.DELETE_REQUEST_FAILURE:
    case requestConstants.GET_ONGOING_REQUESTS_FAILURE:
    case requestConstants.CHANGE_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case requestConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
