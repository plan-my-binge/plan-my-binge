import {combineReducers} from 'redux';
import appReducer from './appReducer'
import homeReducer from "./homeReducer";

const reducer = combineReducers({
  ...appReducer,
  ...homeReducer
});

export default reducer;
