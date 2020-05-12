import {handleActions} from "redux-actions";
import {setShowDetailPageError, setShowDetailPageLoader} from "../containers/actionCreater";

const INITIAL_STATE = {showError: false, showLoader: false};

const showDetailPage = handleActions(
  {
    [setShowDetailPageLoader]: (state, {payload}) => ({...state, showLoader: payload}),

    [setShowDetailPageError]: (state, {payload}) => ({...state, showError: payload})
  },
  INITIAL_STATE
);

export default {showDetailPage};
