import {connect} from 'react-redux'
import {getAllRecentlyVisitedShowsFromState, getPopularShowsFromState} from "./selectors";
import {RecentlyVisitedShowsPageWithRouter} from "../components/RecentlyVisitedShowsPage";

const mapStateToProps = (state, ownProps) => {
  return {
    recentlyVisitedShows: getAllRecentlyVisitedShowsFromState(state),
    popularShows: getPopularShowsFromState(state)
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
};

const RecentlyVisitedShowsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentlyVisitedShowsPageWithRouter);

export default RecentlyVisitedShowsPageContainer