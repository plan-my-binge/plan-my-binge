import React, {Component} from "react";
import {SearchResults} from "./SearchResults.jsx";
import styled from "styled-components";
import {withRouter} from "react-router-dom";
import {Colors} from "../utils/Constants";
import {createSearchQuery} from "../utils/apiUtils";
import axios from "axios";
import {ShowListShimmer} from "./ShowListShimmer";
import {PopularShows} from "./PopularShows";
import {AppHeader} from "./AppHeader";
import {SearchIcon} from "../icons/SearchIcon";

class SearchPage extends Component<{}> {

  state = {
    searchQuery: "",
    showLoader: false,
    searchResults: [],
    searchFailed: false,
  };

  componentDidMount() {
    if (this.props.location.search) {
      let searchQuery = this.props.location.search.replace(/^\?q=/, "");
      searchQuery = decodeURIComponent(searchQuery);
      this.setState({searchQuery: searchQuery});
      this.handleInputChange(searchQuery)
    }

    if (this.props.popularShows.length === 0) {
      this.props.getPopularShows();
    }
  }

  searchShow = createSearchQuery();

  handleInputChange = (value) => {
    this.setState({searchQuery: value, showLoader: true});
    this.props.history.replace({
      pathname: '/search',
      search: '?q=' + value
    });

    this.searchShow(value)
      .then(response => {
        this.props.storeShows(response);
        return this.setState({searchResults: response, showLoader: false});
      })
      .catch(error => {
        let isCancel = axios.isCancel(error);
        if (isCancel) this.setState({showLoader: true});
        else this.setState({searchFailed: true, showLoader: false})
      })
  };

  render() {
    const {showLoader, searchResults, searchQuery} = this.state;
    const {popularShows} = this.props;

    return <div>
      <AppHeader history={this.props.history} title={"Search TV Shows"}/>
      <SearchContainer>
        <SearchIconStyled fontSize={"large"}/>

        <Input type={"text"} placeholder={"Search TV Show Eg. \"The Office\""} autoFocus
               value={searchQuery}
               onFocus={() => this.props.inputFocused(true)}
               onBlur={() => this.props.inputFocused(false)}
               onChange={(e) => this.handleInputChange(e.target.value)}
        />
        <span/>
      </SearchContainer>
      {showLoader && <ShowListShimmer/>}

      {(!showLoader) &&
      searchQuery !== "" &&
      searchResults.length === 0 &&
      <NoResultsFound>No results found :(</NoResultsFound>}

      <SearchResults searchResults={searchResults}/>
      {popularShows.length !== 0 && <PopularShows shows={popularShows}/>}


    </div>
  }

}

export const SearchPageWithRouter = withRouter(SearchPage);
const SearchHeader = styled.div`
  border-bottom: 1px solid ${Colors.gray};
  display: flex;
  flex-direction: row;
  width: 100%;
  font-weight: 600;
  padding-top: 10px;
  padding-bottom: 10px;
  position: fixed;
  top: 0;
  z-index: 999;
  background-color: ${Colors.white};
`;

const IconContainer = styled.a`
  border-radius: 50%;
  margin-right: 5px;
  cursor: pointer;
  font-size: large;
  color: ${Colors.black};
  
  &:hover {
    color: ${Colors.black};
    background-color: ${Colors.gray};
  }
`;

const SearchIconStyled = styled(SearchIcon)`
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  height: 50px;
  margin: 30px 20px 20px;
`;

const Input = styled.input`
  height: 100%;
  width: 100%;
  font-size: 1.2rem;
  border-bottom: 1px solid gray;
  
  ~ span {
    height: 2px;
    background-color: red;
  }
  
  &:focus span {
    width: 100%;
    height: 4px;
    transition: 0.5s;
  }
`;

const NoResultsFound = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Colors.darkGray};
`;
