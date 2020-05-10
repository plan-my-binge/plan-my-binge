import React, {Component} from 'react';
import styled from 'styled-components';
import {BingeDetail} from "./BingeDetail.jsx";
import {getPopularShows} from "../service/api";
import {BingeDetailShimmer} from "./BingeDetailShimmer.jsx";
import {HomePageError} from "./HomePageError.jsx";
import {BingeDetailModel} from "../data/BingeDetailModel";
import {PopularShows} from "./PopularShows.jsx";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {BingeDetailPage} from "./BingeDetailPage.jsx";
import {ScrollToTop} from "./ScrollToTop.jsx";

export class BingePlanner extends Component<Props> {

  state = {
    popularShows: [],
    showLoader: true,
    showError: false
  };

  componentDidMount(): void {
    getPopularShows()
      .then(response => this.setState({popularShows: response.data}))
      .catch(() => this.setState({showError: true}))
      .finally(() => this.setState({showLoader: false}));
  }

  render() {
    const {showLoader, popularShows, showError} = this.state;
    return (
      <Container>


        <BrowserRouter>
          <Switch>

            <Route path={"/binge/:pmbId"}>
              <ScrollToTop/>
              <BingeDetailPage/>
              {popularShows.length !== 0 && <PopularShows shows={popularShows}/>}
            </Route>

            <Route path={"/"}>
              <ScrollToTop/>
              <HeaderMessage>
                How long will it take to watch all episodes of a TV Show?
              </HeaderMessage>
              <SearchContainer>
                <Input type={"text"} placeholder={"Search TV Show Eg. Game of Thrones"}/>
                <span/>
              </SearchContainer>

              {popularShows.length !== 0 && <BingeDetail detail={new BingeDetailModel(popularShows[0]._source)}/>}
              {showError && <HomePageError/>}
              {showLoader && <BingeDetailShimmer/>}
              {popularShows.length !== 0 && <PopularShows shows={popularShows}/>}
            </Route>
          </Switch>
        </BrowserRouter>
      </Container>
    )
  }
}


const Container = styled.div`
  padding: 15px;
`;

const SearchContainer = styled.div`
  
  height: 50px;
  margin-top: 30px;
`;
const Input = styled.input`
  height: 100%;
  width: 100%;
  font-size: 1.2rem;
  border-bottom: 1px solid gray;
  
  ~ span {
    height: 2px;
    background-color: #27ad8a;
  }
  
  &:focus span {
    width: 100%;
    transition: 0.5s;
  }
`;


const HeaderMessage = styled.h4`
  font-weight: 600;
  text-align: center;

`;
