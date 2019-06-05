import { combineReducers } from "redux";

import PostReducer from "./post";
import AppReducer from "./app";

export default combineReducers({
  PostReducer,
  AppReducer
});
