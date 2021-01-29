import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  auth,
  user,
  profile,
  job,
  filters,
  blog,
  event,
  chat,
  admin,
  interview,
  notf,
} from "./reducers";
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(
  combineReducers({
    auth,
    user,
    profile,
    job,
    filters,
    blog,
    event,
    chat,
    admin,
    interview,
    notf,
  }),
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
