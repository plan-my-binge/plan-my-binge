import {createSelector} from "reselect";

const getPopularShowIds = state => state.shows.popularShowIds || [];
const getRecentlyVisitedShowIds = state => (state.shows.visited || []).slice(-6);
const getAllRecentlyVisitedShowIds = state => (state.shows.visited || []);

const getShows = state => state.shows.allShows || [];

export const getPopularShowsFromState = createSelector(
  [getPopularShowIds, getShows], (popularShowIds, shows) =>
    shows.filter(x => popularShowIds.includes(x.pmbId))
);

export const getRecentlyVisitedShowsFromState = createSelector(
  [getRecentlyVisitedShowIds, getShows], (recentlyVisitedShowIds, shows) => {
    let listOfShows = shows.filter(x => recentlyVisitedShowIds.includes(x.pmbId));
    // Hack to preserve order
    return recentlyVisitedShowIds.map(x => shows.find(show => show.pmbId == x)).reverse();
  }
);

export const getAllRecentlyVisitedShowsFromState = createSelector(
  [getAllRecentlyVisitedShowIds, getShows], (recentlyVisitedShowIds, shows) => {
    let listOfShows = shows.filter(x => recentlyVisitedShowIds.includes(x.pmbId));
    // Hack to preserve order
    return recentlyVisitedShowIds.map(x => shows.find(show => show.pmbId == x)).reverse();
  }
);
