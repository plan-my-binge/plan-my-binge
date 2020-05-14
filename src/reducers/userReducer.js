import {handleActions} from "redux-actions";
import {setUserBingeTime} from "../containers/actionCreater";
import {BingeUnit} from "../utils/Constants";

const INITIAL_STATE = {userBingeTime: { value: 1, unit: BingeUnit.episodes}};

const user = handleActions(
  {
    [setUserBingeTime]: (state, {payload}) => ({...state, userBingeTime: payload})
  },
  INITIAL_STATE
);

export default {user};
