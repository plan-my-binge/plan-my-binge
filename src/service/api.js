import axios from "axios";

export const getPopularShows = () => axios.get("http://localhost:5000/shows/popular");
