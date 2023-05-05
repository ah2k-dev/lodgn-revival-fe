import { requestConstants } from "../constants/requestConstants";

const initialState = {
  requests: [],
  onGoing: [],
  request: {},
  previousStays: [],
  requestedUpdates: [],
  rejected: [],
  reports: [],
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
    case requestConstants.BOOK_OFFER_REQUEST:
    case requestConstants.GET_PREVIOUS_STAYS_REQUEST:
    case requestConstants.GET_REQUEST_UPDATES_REQUEST:
    case requestConstants.APPROVE_REJECT_UPDATE_REQUEST:
    case requestConstants.GET_REJECTED_REQUESTS_REQUEST:
    case requestConstants.GET_REPORTS_REQUEST:
    case requestConstants.UPDATE_OFFER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case requestConstants.CREATE_REQUEST_SUCCESS:
    case requestConstants.BOOK_OFFER_SUCCESS:
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
    case requestConstants.UPDATE_OFFER_SUCCESS:
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
    case requestConstants.APPROVE_REJECT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case requestConstants.GET_REQUEST_UPDATES_SUCCESS:
      return {
        ...state,
        loading: false,
        requestedUpdates: action.payload,
      };

    case requestConstants.GET_PREVIOUS_STAYS_SUCCESS:
      return {
        ...state,
        loading: false,
        previousStays: action.payload,
      };

    case requestConstants.GET_REJECTED_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        rejected: action.payload,
      };

    case requestConstants.GET_REPORTS_SUCCESS:
      return {
        ...state,
        loading: false,
        reports: action.payload,
      };

    case requestConstants.CREATE_REQUEST_FAILURE:
    case requestConstants.GET_ONE_REQUEST_FAILURE:
    case requestConstants.GET_REQUESTS_FAILURE:
    case requestConstants.UPDATE_REQUEST_FAILURE:
    case requestConstants.DELETE_REQUEST_FAILURE:
    case requestConstants.GET_ONGOING_REQUESTS_FAILURE:
    case requestConstants.CHANGE_STATUS_FAILURE:
    case requestConstants.BOOK_OFFER_FAILURE:
    case requestConstants.GET_PREVIOUS_STAYS_FAILURE:
    case requestConstants.GET_PREVIOUS_STAYS_FAILURE:
    case requestConstants.GET_REQUEST_UPDATES_FAILURE:
    case requestConstants.APPROVE_REJECT_UPDATE_FAILURE:
    case requestConstants.GET_REJECTED_REQUESTS_FAILURE:
    case requestConstants.GET_REPORTS_FAILURE:
    case requestConstants.UPDATE_OFFER_FAILURE:
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
