import {connect} from 'react-redux'
import {getAllBookmarkedShows, getPopularShowsFromState} from "./selectors";
import {BookmarkedShowsPageWithRouter} from "../components/BookmarkedShowsPage";
import {getPopularShows} from "./actionCreater";

const mapStateToProps = (state, ownProps) => {
  return {
    bookmarkedShows: getAllBookmarkedShows(state),
    popularShows: getPopularShowsFromState(state)
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
};

const BookmarkedShowsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarkedShowsPageWithRouter);

export default BookmarkedShowsPageContainer