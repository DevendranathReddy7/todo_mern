import { combineReducers } from "redux";
import AUTH from "./authReducer";
import TODO from "./todoReducer";
const rootReducer = combineReducers({
  auth: AUTH,
  todo: TODO,
});

export default rootReducer;
