import axios from "axios";

const host = "192.168.43.78";

export const searchShow = (query, cancellationToken) =>
  axios.get(`http://${host}:5000/shows?q=${query}`, cancellationToken);

export const Api = {
  getShow : (showId) => axios.get(`http://${host}:5000/shows/${showId}`),
  getPopularShow : () => axios.get(`http://${host}:5000/shows/popular`)
};

export const Url = {
  getPopularShows : `http://${host}:5000/shows/popular`,
};