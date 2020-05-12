import {connect} from 'react-redux'
import {getPopularShowsFromState} from "./selectors";
import {getPopularShows} from "./actionCreater";
import {SearchPageWithRouter} from "../components/SearchPage";

const mapStateToProps = (state, ownProps) => {
  return {
    popularShows: getPopularShowsFromState(state),
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPopularShows: () => dispatch(getPopularShows())
  }
};

const SearchPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPageWithRouter);

export default SearchPageContainer