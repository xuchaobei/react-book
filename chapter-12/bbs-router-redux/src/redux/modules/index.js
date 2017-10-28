import { combineReducers } from "redux";
import app from "./app";
import auth from "./auth";
import ui from "./ui";
import remarks from "./remarks";
import topics from "./topics";
import users from "./users";

const rootReducer = combineReducers({
  app,
  auth,
  ui,
  topics,
  remarks,
  users
});

export default rootReducer;
