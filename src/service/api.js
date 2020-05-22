import axios from "axios";

const host = "127.0.0.1:5000";

export const searchShow = (query, cancellationToken) =>
  axios.get(`http://${host}/shows?q=${query}`, cancellationToken);

export const Api = {
  getShow : (showId) => axios.get(`http://${host}/shows/${showId}`),
  getPopularShow : () => axios.get(`http://${host}/shows/popular`)
};

export const Url = {
  getPopularShows : `http://${host}/shows/popular`,
};