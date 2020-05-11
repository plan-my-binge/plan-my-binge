import logo from "../images/logo.png";
import {BingeDetail} from "./BingeDetail";
import {BingeDetailModel} from "../data/BingeDetailModel";
import {HomePageError} from "./HomePageError";
import {BingeDetailShimmer} from "./BingeDetailShimmer";
import {PopularShows} from "./PopularShows";
import React, {Component} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Url} from "../service/api";
import {cachingApiRequest} from "../utils/apiUtils";
import SearchIcon from '@material-ui/icons/Search';

export class HomePage extends Component<{}> {

  state = {
    popularShows: [],
    showLoader: true,
    showError: false,
  };

  request = cachingApiRequest();

  componentDidMount(): void {
    this.request(Url.getPopularShows)
      .then(data => this.setState({popularShows: data}))
      .catch(() => this.setState({showError: true}))
      .finally(() => this.setState({showLoader: false}));
  }

  render() {
    let {popularShows, showError, showLoader} = this.state;

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

      {popularShows.length !== 0 && <BingeDetail detail={new BingeDetailModel(popularShows[0]._source)}/>}
      {showError && <HomePageError/>}
      {showLoader && <BingeDetailShimmer/>}
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
