import {connect} from 'react-redux'
import {HomePage} from "../components/HomePage";
import {getPopularShows} from "./actionCreater";
import {getPopularShowsFromState, getRecentlyVisitedShowsFromState} from "./selectors";


const mapStateToProps = (state, ownProps) => {
  return {
    popularShows: getPopularShowsFromState(state),
    recentlyVisitedShows: getRecentlyVisitedShowsFromState(state),
    showError: state.home.showError,
    showLoader: state.home.showLoader
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPopularShows: () => dispatch(getPopularShows())
  }
};

const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

export default HomePageContainer