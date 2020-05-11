import axios from "axios";

export const getPopularShows = () => axios.get("http://localhost:5000/shows/popular");

export const getShow = (showId) => axios.get("http://localhost:5000/shows/" + showId);

export const searchShow = (query, cancellationToken) =>
  axios.get("http://localhost:5000/shows?q=" + query, cancellationToken);


export const Url = {
  getPopularShows : "http://localhost:5000/shows/popular"
};