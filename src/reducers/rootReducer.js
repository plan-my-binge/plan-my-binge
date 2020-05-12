import {combineReducers} from 'redux';
import appReducer from './appReducer'
import homeReducer from "./homeReducer";
import showsReducer from "./showsReducer";
import showDetailsPageReducer from "./showDetailsPageReducer";

const reducer = combineReducers({
  ...appReducer,
  ...homeReducer,
  ...showsReducer,
  ...showDetailsPageReducer
});

export default reducer;
