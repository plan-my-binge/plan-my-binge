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
      cancelToken.cancel();
    }

    cancelToken = axios.CancelToken.source();
    try {
      if (cache[query]) {
        return cache[query];
      }
      const res = await searchShow(query, { cancelToken: cancelToken.token });

      const result = res.data;
      cache[query] = result;

      return result;
    } catch (error) {
      if (axios.isCancel(error)) {
        // Handle if request was cancelled
      } else {
        // Handle usual errors
        throw {error}
      }
    }
  };
};
