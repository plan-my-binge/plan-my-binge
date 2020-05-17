import axios from "axios";

const host = "planmybinge.com/api";

export const searchShow = (query, cancellationToken) =>
  axios.get(`https://${host}/shows?q=${query}`, cancellationToken);

export const Api = {
  getShow : (showId) => axios.get(`https://${host}/shows/${showId}`),
  getPopularShow : () => axios.get(`https://${host}/shows/popular`)
};

export const Url = {
  getPopularShows : `https://${host}/shows/popular`,
};