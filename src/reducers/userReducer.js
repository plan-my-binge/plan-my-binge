import {handleActions} from "redux-actions";
import {setSessionId, setUserBingeTime, setUserId} from "../containers/actionCreater";
import {BingeUnit} from "../utils/Constants";

const INITIAL_STATE = {userBingeTime: { value: 1, unit: BingeUnit.episodes}, userId: null, sessionId: null};

const user = handleActions(
  {
    [setUserBingeTime]: (state, {payload}) => ({...state, userBingeTime: payload}),
    [setUserId]: (state, {payload}) => ({...state, userId: payload}),
    [setSessionId]: (state, {payload}) => ({...state, sessionId: payload})
  },
  INITIAL_STATE
);

export default {user};
