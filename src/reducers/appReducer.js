import {REHYDRATE} from 'redux-persist/constants'
import {handleActions} from "redux-actions";
import {inputFocused} from "../containers/actionCreater";

const INITIAL_STATE = {ready: false, inputFocused: false};

const app = handleActions(
  {
    [REHYDRATE]: (state) => ({
      ...state,
      ready: true,
    }),

    [inputFocused]: (state, {payload}) => ({...state, inputFocused: payload})
  },
  INITIAL_STATE
);

export default {app};
