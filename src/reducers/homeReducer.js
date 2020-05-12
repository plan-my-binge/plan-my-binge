import {handleActions} from "redux-actions";
import {setShowHomePageError, setShowHomePageLoader} from "../containers/actionCreater";

const INITIAL_STATE = {showError: false, showLoader: true};

const home = handleActions(
  {
    [setShowHomePageError]: (state, {payload}) => ({...state, showError: payload}),

    [setShowHomePageLoader]: (state, {payload}) => ({...state, showLoader: payload})

  },
  INITIAL_STATE
);

export default {home};
