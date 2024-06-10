import { combineReducers } from "redux";
import AUTH from "./authReducer";

const rootReducer = combineReducers({
  auth: AUTH,
});

export default rootReducer;
