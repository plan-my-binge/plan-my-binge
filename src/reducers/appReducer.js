import {REHYDRATE} from 'redux-persist/constants'
import {handleActions} from "redux-actions";
import {inputFocused, setUserBingeTime} from "../containers/actionCreater";
import {BingeUnit} from "../utils/Constants";

const INITIAL_STATE = {ready: false, inputFocused: false, userBingeTime: { value: 1, unit: BingeUnit.episodes}};

const app = handleActions(
  {
    [REHYDRATE]: (state) => ({
      ...state,
      ready: true,
    }),

    [inputFocused]: (state, {payload}) => ({...state, inputFocused: payload}),
    [setUserBingeTime]: (state, {payload}) => ({...state, userBingeTime: payload})
  },
  INITIAL_STATE
);

export default {app};
