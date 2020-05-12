import {connect} from 'react-redux'
import {getPopularShowsFromState} from "./selectors";
import {getPopularShows, inputFocused, storeShows} from "./actionCreater";
import {SearchPageWithRouter} from "../components/SearchPage";
import {BingeDetailModel} from "../data/BingeDetailModel";

const mapStateToProps = (state, ownProps) => {
  return {
    popularShows: getPopularShowsFromState(state),
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPopularShows: () => dispatch(getPopularShows()),
    storeShows: (shows) => dispatch(storeShows(shows.map(x => BingeDetailModel(x._source)))),
    inputFocused: (value) => dispatch(inputFocused(value))
  }
};

const SearchPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPageWithRouter);

export default SearchPageContainer