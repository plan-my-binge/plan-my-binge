import {handleActions} from "redux-actions";
import {markShowAsVisited, storePopularShows, storeShow, storeShows, toggleBookmark} from "../containers/actionCreater";
import {eqBy, prop, reverse, unionWith, uniq} from "ramda";

const INITIAL_STATE = {popularShowIds: [], allShows: [], visited: [], bookmarkedShowIds: []};

const shows = handleActions(
  {
    [storePopularShows]: (state, {payload: popularShows}) => {
      return ({
        ...state,
        popularShowIds: popularShows.map(x => x.pmbId),
        allShows: unionWith(eqBy(prop('pmbId')), state.allShows, popularShows)
      })},

    [storeShow]: (state, {payload: show}) => {
      return ({
        ...state,
        allShows: unionWith(eqBy(prop('pmbId')), state.allShows, [show])
      })},

    [storeShows]: (state, {payload: shows}) => {
      return ({
        ...state,
        allShows: unionWith(eqBy(prop('pmbId')), state.allShows, shows)
      })},
    [markShowAsVisited]: (state, {payload: showId}) => {
      return ({
        ...state,
        // reversing twice to keep recently viewed at the bottom
        visited: reverse(uniq(reverse([...state.visited, showId])))
      })
    },
    [toggleBookmark]: (state, {payload: showId}) => {
      if (state.bookmarkedShowIds.includes(showId))
        return ({
          ...state,
          bookmarkedShowIds: state.bookmarkedShowIds.filter(x => x !== showId)
        });
      return ({
        ...state,
        bookmarkedShowIds: reverse(uniq(reverse([...state.bookmarkedShowIds, showId])))
      })
    }
  },
  INITIAL_STATE
);

export default {shows};
