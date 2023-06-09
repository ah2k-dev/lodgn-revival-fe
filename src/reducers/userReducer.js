import { userConstants } from "../constants/userConstaants";

export const userReducer = (
  state = {
    users: [],
    moderators: [],
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case userConstants.FETCH_USERS_REQUEST:
    case userConstants.BLOCKUNBLOCK_USER_REQUEST:
    case userConstants.CREATE_MODERATOR_REQUEST:
    case userConstants.FETCH_PERSONAL_INFO_REQUEST:
    case userConstants.UPDATE_PERSONAL_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case userConstants.FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.data.users,
        moderators: action.payload.data.moderators,
      };
    case userConstants.BLOCKUNBLOCK_USER_SUCCESS:
    case userConstants.CREATE_MODERATOR_SUCCESS:
    case userConstants.UPDATE_PERSONAL_INFO_SUCCESS:
    case userConstants.UPDATE_PASSWORD_SUCCESS:
    case userConstants.UPDATE_MODERATOR_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case userConstants.FETCH_USERS_FAILURE:
    case userConstants.BLOCKUNBLOCK_USER_FAILURE:
    case userConstants.CREATE_MODERATOR_FAILURE:
    case userConstants.FETCH_PERSONAL_INFO_FAILURE:
    case userConstants.UPDATE_PERSONAL_INFO_FAILURE:
      case userConstants.UPDATE_PASSWORD_FAILURE:
    case userConstants.UPDATE_MODERATOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case userConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
