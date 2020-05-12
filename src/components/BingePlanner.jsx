import React, {Component} from 'react';
import styled from 'styled-components';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {BingDetailPageWithRouter} from "./BingeDetailPage.jsx";
import {ScrollToTop} from "./ScrollToTop.jsx";
import {SearchPageWithRouter} from "./SearchPage.jsx";
import HomePageContainer from "../containers/HomePageContainer";
import BingeDetailPageContainer from "../containers/BingeDetailPage";

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
              <SearchPageWithRouter/>
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
