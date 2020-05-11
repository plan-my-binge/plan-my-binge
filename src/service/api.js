import axios from "axios";

const host = "192.168.43.78";

export const getPopularShows = () => axios.get(`http://${host}:5000/shows/popular`);

export const getShow = (showId) => axios.get(`http://${host}:5000/shows/${showId}`);

export const searchShow = (query, cancellationToken) =>
  axios.get(`http://${host}:5000/shows?q=${query}`, cancellationToken);


export const Url = {
  getPopularShows : `http://${host}:5000/shows/popular`
};