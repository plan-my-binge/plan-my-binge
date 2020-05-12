import {handleActions} from "redux-actions";
import {storePopularShows, storeShows} from "../containers/actionCreater";
import {eqBy, prop, unionWith} from "ramda";

const INITIAL_STATE = {popularShowIds: [], allShows: []};

const shows = handleActions(
  {
    [storePopularShows]: (state, {payload: popularShows}) => {
      return ({
        ...state,
        popularShowIds: popularShows.map(x => x.pmbId),
        allShows: unionWith(eqBy(prop('pmbId')), state.allShows, popularShows)
      })},

    [storeShows]: (state, {payload: show}) => {
      return ({
        ...state,
        allShows: unionWith(eqBy(prop('pmbId')), state.allShows, [show])
      })},
  },
  INITIAL_STATE
);

export default {shows};
