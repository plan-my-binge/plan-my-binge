import axios from "axios";
import {searchShow} from "../service/api";

const cache = {};

export const cachingApiRequest = () => {

  return async url => {

    try {
      if (cache[url]) {
        return cache[url];
      }
      const res = await axios(url);
      const result = res.data;
      cache[url] = result;
      return result;
    } catch (error) {
      throw error
    }
  };

};
export const createSearchQuery = () => {
  let cancelToken;

  return async query => {
    
    if (cancelToken) {
      console.log("Aborting previous request");
      cancelToken.cancel();
    }

    console.log("Creating new request for query -> " + query)
    cancelToken = axios.CancelToken.source();
    try {
      if (cache[query]) {
        console.log("Serving " + query + " from memory!");
        return cache[query];
      }
      console.log("Requesting " + query);
      const res = await searchShow(query, { cancelToken: cancelToken.token });

      const result = res.data;
      cache[query] = result;

      return result;
    } catch (error) {
      if (axios.isCancel(error)) {
        // Handle if request was cancelled
        console.log('Request canceled', error.message);
      } else {
        // Handle usual errors
        console.log('Something went wrong: ', error.message);
      }
      throw error
    }
  };
};
