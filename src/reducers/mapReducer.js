import { mapConstants } from "../constants/mapConstants";

export const mapReducer = (
  state = {
    center: {
      lat: "",
      lng: "",
    },
    hotels: [],
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
    default:
      return state;
  }
};
