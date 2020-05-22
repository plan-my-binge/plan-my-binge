import axios from "axios";

const host = process.env.API_HOST;

export const searchShow = (query, cancellationToken) =>
  axios.get(`${host}/shows?q=${query}`, cancellationToken);

export const Api = {
  getShow : (showId) => axios.get(`${host}/shows/${showId}`),
  getPopularShow : () => axios.get(`${host}/shows/popular`)
};

export const Url = {
  getPopularShows : `${host}/shows/popular`,
};