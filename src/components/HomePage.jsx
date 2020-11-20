import {HomePageError} from "./HomePageError";
import {BingeDetailShimmer} from "./BingeDetailShimmer";
import {PopularShows} from "./PopularShows";
import React, {Component} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {RecentlyVisitedShows} from "./RecentlyVisitedShows";
import BingeDetailContainer from "../containers/BingeDetailContainer";
import {BookmarkedShows} from "./BookmarkedShows";
import {MobileHomePageHeaderWithRouter} from "./MobileHomePageHeader";
import isEmpty from "ramda/src/isEmpty";
import {Feedback} from "./Feedback";

export class HomePage extends Component<{}> {

  componentDidMount(): void {
    if (Boolean(document)) {
      document.title = "Plan my binge! - Binge clock: Find how long does it take to watch any TV show"
    }
    if (this.props.popularShows.length === 0)
      this.props.getPopularShows()
  }

  render() {
    let {popularShows, showError, showLoader, recentlyVisitedShows, bookmarkedShows} = this.props;

    let highlightedShow =
      !isEmpty(bookmarkedShows) ? bookmarkedShows[0] :
        (!isEmpty(recentlyVisitedShows) ? recentlyVisitedShows[0] :
          (!isEmpty(popularShows) ? popularShows[0] : null));

    let recentlyVisitedShowsAvailable = recentlyVisitedShows.length !== 0;
    return <Container>
      <MobileHomePageHeaderWithRouter detail={highlightedShow}/>

      {highlightedShow && <BingeDetailContainer detail={highlightedShow}/>}

      {/*if recently viewed is empty fetch and show popular shows*/}
      {!highlightedShow && showError && <HomePageError/>}
      {!highlightedShow && showLoader && <BingeDetailShimmer/>}

      {!isEmpty(bookmarkedShows) && <BookmarkedShows shows={bookmarkedShows}/>}
      {recentlyVisitedShowsAvailable && <RecentlyVisitedShows shows={recentlyVisitedShows}/>}
      {popularShows.length !== 0 && <PopularShows shows={popularShows}/>}
    </Container>
  }
}

const Container = styled.div`
  margin-bottom: 50px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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


const HeaderMessage = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 600;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;


const Logo = styled.img`
  max-width: 300px;
  width: 100%;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 20px;
  margin: auto;  
`;

const SearchLink = styled(Link)`
  width: 100%;
  height: 50px;
  
`;
