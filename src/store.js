import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/authReducer";
import { mapReducer } from "./reducers/mapReducer";
import { requestReducer } from "./reducers/requestReducer";
import { userReducer } from "./reducers/userReducer";
const reducer = combineReducers({
  auth: authReducer,
  map: mapReducer, // modified to handle create request with login
  request: requestReducer, // added
  user: userReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
