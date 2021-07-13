import {combineReducers} from 'redux';
import appReducer from './appReducer'
import homeReducer from "./homeReducer";
import showsReducer from "./showsReducer";
import showDetailsPageReducer from "./showDetailsPageReducer";
import userReducer from "./userReducer";
import ssrReducer from "./ssrReducer";

const reducer = combineReducers({
  ...appReducer,
  ...homeReducer,
  ...showsReducer,
  ...showDetailsPageReducer,
  ...userReducer,
  ...ssrReducer
});

export default reducer;
