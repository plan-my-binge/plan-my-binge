import logo from "../images/logo.png";
import {BingeDetail} from "./BingeDetail";
import {HomePageError} from "./HomePageError";
import {BingeDetailShimmer} from "./BingeDetailShimmer";
import {PopularShows} from "./PopularShows";
import React, {Component} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import {RecentlyVisitedShows} from "./RecentlyVisitedShows";
import BingeDetailContainer from "../containers/BingeDetailContainer";
import {isEmpty} from "ramda";
import {BookmarkedShows} from "./BookmarkedShows";

export class HomePage extends Component<{}> {

  componentDidMount(): void {
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
    return <>
      <Logo xs={12} src={logo} className={"d-block d-lg-none"}/>
      <HeaderMessage>
        <h4>Find out How long will it take to watch all episodes of any TV Show</h4>
      </HeaderMessage>
      <SearchContainer>
        <SearchIcon fontSize={"large"}/>
        <SearchLink to={"/search"}>
          <Input type={"text"} placeholder={"Search TV Show Eg. \"The Office\""}/>
        </SearchLink>
        <span/>
      </SearchContainer>

      {highlightedShow && <BingeDetailContainer detail={highlightedShow}/>}

      {/*if recently view is empty fetch and show popular shows*/}
      {!highlightedShow && showError && <HomePageError/>}
      {!highlightedShow && showLoader && <BingeDetailShimmer/>}

      {!isEmpty(bookmarkedShows) && <BookmarkedShows shows={bookmarkedShows}/>}
      {recentlyVisitedShowsAvailable && <RecentlyVisitedShows shows={recentlyVisitedShows}/>}
      {popularShows.length !== 0 && <PopularShows shows={popularShows}/>}
    </>
  }
}


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
`;


const Logo = styled.img`
  max-width: 400px;
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
