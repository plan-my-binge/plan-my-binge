import React, {Component} from 'react';
import styled from 'styled-components';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {ScrollToTop} from "./ScrollToTop.jsx";
import HomePageContainer from "../containers/HomePageContainer";
import BingeDetailPageContainer from "../containers/BingeDetailPageContainer";
import SearchPageContainer from "../containers/SearchPageContainer";
import RecentlyVisitedShowsPageContainer from "../containers/RecentlyVisitedShowsPageContainer";
import BookmarkedShowsPageContainer from "../containers/BookmarkedShowsPageContainer";

export class BingePlanner extends Component {

  render() {
    return (
      <Container>

        <BrowserRouter>
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
        </BrowserRouter>
      </Container>
    )
  }
}


const Container = styled.div`
  padding: 5px;
`;
