import {createSelector} from "reselect";

const getPopularShowIds = state => state.shows.popularShowIds || [];
const getShows = state => state.shows.allShows || [];

export const getPopularShowsFromState = createSelector(
  [getPopularShowIds, getShows], (popularShowIds, shows) =>
    shows.filter(x => popularShowIds.includes(x.pmbId))
);
