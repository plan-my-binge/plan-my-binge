import {createSelector} from "reselect";

const getPopularShowIds = state => state.shows.popularShowIds || [];

const getRecentlyVisitedShowIds = state => (state.shows.visited || []).slice(-6);
const getAllRecentlyVisitedShowIds = state => (state.shows.visited || []);

const getRecentlyBookmarkedShowIds = state => (state.shows.bookmarkedShowIds || []).slice(-6);
const getAllBookmarkedShowIds = state => (state.shows.bookmarkedShowIds || []);

const getShows = state => state.shows.allShows || [];

const getBookmarkedShowIds = state => state.shows.bookmarkedShowIds || [];

export const getPopularShowsFromState = createSelector(
  [getPopularShowIds, getShows], (popularShowIds, shows) =>
    shows.filter(x => popularShowIds.includes(x.pmbId))
);

export const getRecentlyVisitedShowsFromState = createSelector(
  [getRecentlyVisitedShowIds, getShows], (recentlyVisitedShowIds, shows) => {
    return recentlyVisitedShowIds.map(x => shows.find(show => show.pmbId == x)).reverse();
  }
);

export const getAllRecentlyVisitedShowsFromState = createSelector(
  [getAllRecentlyVisitedShowIds, getShows], (recentlyVisitedShowIds, shows) => {
    return recentlyVisitedShowIds.map(x => shows.find(show => show.pmbId == x)).reverse();
  }
);

export const getRecentBookmarkedShows = createSelector(
  [getRecentlyBookmarkedShowIds, getShows], (recentlyBookmarkedShows, shows) => {
    return recentlyBookmarkedShows.map(x => shows.find(show => show.pmbId == x)).reverse();
  }
);

export const getAllBookmarkedShows = createSelector(
  [getAllBookmarkedShowIds, getShows], (allBookmarkedShows, shows) => {
    return allBookmarkedShows.map(x => shows.find(show => show.pmbId == x)).reverse();
  }
);

export const getBookmarkStatus = (showId) =>
  createSelector(
    [getBookmarkedShowIds], (bookmarkedShowIds) => {
      return bookmarkedShowIds.includes(showId);
    }
  );
