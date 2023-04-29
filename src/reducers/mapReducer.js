import { mapConstants } from "../constants/mapConstants";

export const mapReducer = ( // modified as request reducer
  state = {
    center: {
      lat: 40.730610,
      lng: -73.935242,
      search: "",
    },
    hotels: [],
    roomRequirements: {
      single: 0,
      double: 0,
      animalSupport: 0,
    },
    dateRange: [],
  },
  action
) => {
  switch (action.type) {
    case mapConstants.SET_CENTER:
      return {
        ...state,
        center: action.payload,
      };
    case mapConstants.SET_HOTELS:
      return {
        ...state,
        hotels: action.payload,
      };
    case mapConstants.SET_ROOM_REQUIREMENTS:
      return {
        ...state,
        roomRequirements: action.payload,
      };
    case mapConstants.SET_DATE_RANGE:
      return {
        ...state,
        dateRange: action.payload,
      };
    case mapConstants.CLEAR_STATE:
      return {
        center: {
          lat: "",
          lng: "",
          search: "",
        },
        hotels: [],
        roomRequirements: {
          single: 0,
          double: 0,
          animalSupport: 0,
        },
        dateRange: [],
      };
    default:
      return state;
  }
};
