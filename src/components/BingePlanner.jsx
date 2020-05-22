import React, {Component} from 'react';
import styled from 'styled-components';
import {Route, Switch, withRouter} from "react-router-dom";
import {ScrollToTop} from "./ScrollToTop.jsx";
import HomePageContainer from "../containers/HomePageContainer";
import BingeDetailPageContainer from "../containers/BingeDetailPageContainer";
import SearchPageContainer from "../containers/SearchPageContainer";
import RecentlyVisitedShowsPageContainer from "../containers/RecentlyVisitedShowsPageContainer";
import BookmarkedShowsPageContainer from "../containers/BookmarkedShowsPageContainer";
import {withTracker} from "./withTracker";
import {connect} from "react-redux";
import {setSessionId, setUserId} from "../containers/actionCreater";
import {generateUUID} from "../utils/jsUtils";
import ReactGA from "react-ga";

export class BingePlanner extends Component {
  componentDidMount() {
    let userId = this.props.userId || generateUUID();
    let sessionId = generateUUID();
    this.props.setUserId(userId);
    this.props.setSessionId(sessionId);
    ReactGA.set({userId, dimension5: userId,  dimension2: sessionId});
  }

  render() {
    console.log(this.props)
    return (
      <Container>

          <Switch>

            <Route path={"/binge/:pmbId"}>
              <ScrollToTop/>
              <BingeDetailPageContainer/>
            </Route>

            <Route path={"/search"}>
              <ScrollToTop/>
              <SearchPageContainer/>
            </Route>

            <Route path={"/recent"}>
              <ScrollToTop/>
              <RecentlyVisitedShowsPageContainer/>
            </Route>

            <Route path={"/bookmarks"}>
              <ScrollToTop/>
              <BookmarkedShowsPageContainer/>
            </Route>

            <Route path={"/"}>
              <ScrollToTop/>
              <HomePageContainer/>
            </Route>

          </Switch>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.user.userId,
    sessionId: state.user.sessionId,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setUserId: (id) => dispatch(setUserId(id)),
  setSessionId: (id) => dispatch(setSessionId(id)),
});

export const BingePlannerWithRouter = connect(mapStateToProps,
  mapDispatchToProps
)(withRouter(withTracker(BingePlanner)));


const Container = styled.div`
  padding: 0;
`;
