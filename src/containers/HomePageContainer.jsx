import {connect} from 'react-redux'
import {HomePage} from "../components/HomePage";
import {getPopularShows} from "../service/api";
import {showHomePageError, storePopularShows} from "./actionCreater";

const mapStateToProps = (state, ownProps) => {
  return {
    popularShows: state.home.popularShows || [],
    showError: state.home.showError || false
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPopularShows: () => {
      getPopularShows().then(response => {
        // let shows = response.data.map(show => new BingeDetailModel(show._source));
        dispatch(storePopularShows(response.data))
      }).catch(() => dispatch(showHomePageError()));
    }
  }
};

const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

export default HomePageContainer