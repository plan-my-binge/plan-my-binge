import {connect} from 'react-redux'
import {getAllBookmarkedShows} from "./selectors";
import {BookmarkedShowsPageWithRouter} from "../components/BookmarkedShowsPage";

const mapStateToProps = (state, ownProps) => {
  return {
    bookmarkedShows: getAllBookmarkedShows(state)
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