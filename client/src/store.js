import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  infoDetailsReducer,
  infoReducer,
  infosReducer,
  newInfoReducer,
} from "./redux/reducers/infoReducer";

const reducer = combineReducers({
  infos: infosReducer,
  newInfo: newInfoReducer,
  info: infoReducer,
  infoDetail: infoDetailsReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
