import {connect} from 'react-redux'
import {BingDetailPageWithRouter} from "../components/BingeDetailPage";
import {getPopularShowsFromState, getRecentlyVisitedShowsFromState} from "./selectors";
import {getPopularShows, getShow} from "./actionCreater";

const mapStateToProps = (state, ownProps) => {
  return {
    popularShows: getPopularShowsFromState(state),
    recentShows: getRecentlyVisitedShowsFromState(state),
    shows: state.shows.allShows,
    showLoader: state.showDetailPage.showLoader,
    showError: state.showDetailPage.showError
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getShow: (id) => dispatch(getShow(id)),
    getPopularShows: () => dispatch(getPopularShows())
  }
};

const BingeDetailPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BingDetailPageWithRouter);

export default BingeDetailPageContainer