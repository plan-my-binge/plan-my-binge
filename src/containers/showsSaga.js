import {call, put, takeEvery} from 'redux-saga/effects'
import {
  getPopularShows,
  getShow, markShowAsVisited,
  setShowDetailPageError,
  setShowDetailPageLoader, setShowHomePageError, setShowHomePageLoader,
  storePopularShows,
  storeShow
} from "./actionCreater";
import {BingeDetailModel} from "../data/BingeDetailModel";
import {Api} from "../service/api";

const fetchShow = function*(action) {
  try {
    yield put(setShowDetailPageError(false))
    yield put(setShowDetailPageLoader(true));
    const response = yield call(Api.getShow, action.payload);
    yield put(storeShow(BingeDetailModel(response.data[0]._source)));
    yield put(markShowAsVisited(response.data[0]._source.pmb_id));
  } catch (e) {
    yield put(setShowDetailPageError(true));
  }
  yield put(setShowDetailPageLoader(false));
};

const fetchPopularShow = function*(action) {
  try {
    yield put(setShowHomePageError(false));
    yield put(setShowHomePageLoader(true));
    const response = yield call(Api.getPopularShow, action.payload);
    let shows = response.data.map(show => BingeDetailModel(show._source));
    yield put(storePopularShows(shows));

  } catch (e) {
    yield put(setShowHomePageError(true));
  }
  yield put(setShowHomePageLoader(false));
};

function* showSaga() {
  yield takeEvery(getShow, fetchShow);
  yield takeEvery(getPopularShows, fetchPopularShow);
}


export default showSaga;