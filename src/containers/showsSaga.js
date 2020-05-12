import {call, put, takeEvery} from 'redux-saga/effects'
import {
  getPopularShows,
  getShow,
  setShowDetailPageError,
  setShowDetailPageLoader, setShowHomePageError, setShowHomePageLoader,
  storePopularShows,
  storeShows
} from "./actionCreater";
import {BingeDetailModel} from "../data/BingeDetailModel";
import {Api} from "../service/api";

const fetchShow = function*(action) {
  try {
    const response = yield call(Api.getShow, action.payload);
    yield put(storeShows(BingeDetailModel(response.data[0]._source)));
  } catch (e) {
    yield put(setShowDetailPageError(true));
  }
  setShowDetailPageLoader(false)
};

const fetchPopularShow = function*(action) {
  try {
    const response = yield call(Api.getPopularShow, action.payload);
    let shows = response.data.map(show => BingeDetailModel(show._source));
    yield put(storePopularShows(shows));

  } catch (e) {
    yield put(setShowHomePageError());
  }
  yield put(setShowHomePageLoader(false));
};

function* showSaga() {
  yield takeEvery(getShow, fetchShow);
  yield takeEvery(getPopularShows, fetchPopularShow);
}


export default showSaga;