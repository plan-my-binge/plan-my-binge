import {handleActions} from "redux-actions";
import {showHomePageError, storePopularShows} from "../containers/actionCreater";

const INITIAL_STATE = {popularShows: [], showError: false, showLoader: true};

const home = handleActions(
  {
    [storePopularShows] : (state, {payload : popularShows}) => ({...state, popularShows}),
    [showHomePageError]: state => ({...state, error: true})
  },
  INITIAL_STATE
);

export default {home};
