import React, {Component} from 'react';
import styled from 'styled-components';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {BingDetailPageWithRouter} from "./BingeDetailPage.jsx";
import {ScrollToTop} from "./ScrollToTop.jsx";
import {SearchPageWithRouter} from "./SearchPage.jsx";
import {HomePage} from "./HomePage.jsx";

export class BingePlanner extends Component<Props> {

  render() {
    return (
      <Container>


        <BrowserRouter>
          <Switch>

            <Route path={"/binge/:pmbId"}>
              <ScrollToTop/>
              <BingDetailPageWithRouter/>
            </Route>

            <Route path={"/search"}>
              <ScrollToTop/>
              <SearchPageWithRouter/>
            </Route>

            <Route path={"/"}>
              <ScrollToTop/>
              <HomePage/>
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
