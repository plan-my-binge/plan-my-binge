import React, {Component} from "react";
import {SearchResults} from "./SearchResults.jsx";
import styled from "styled-components";
import {withRouter} from "react-router-dom";
import {Colors, TrackingCategory} from "../utils/Constants";
import {createSearchQuery, ga} from "../utils/apiUtils";
import axios from "axios";
import {ShowListShimmer} from "./ShowListShimmer";
import {PopularShows} from "./PopularShows";
import {AppHeader} from "./AppHeader";
import {SearchIcon} from "../icons/SearchIcon";
import ReactGA from "react-ga";

class SearchPage extends Component<{}> {

  state = {
    searchQuery: "",
    showLoader: false,
    searchResults: [],
    searchFailed: false,
    searchResultClicked: false
  };

  componentDidMount() {
    if (Boolean(document)) {
      document.title = "Search Shows - Plan my binge!"
    }
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

  componentWillUnmount() {
    ReactGA.event(ga(TrackingCategory.SearchUsefulness,
      'Search Usefulness', this.state.searchResultClicked.toString()));
  }

  searchShow = createSearchQuery();

  handleInputChange = (value) => {
    this.setState({searchQuery: value, showLoader: true, searchResultClicked: false});
    this.props.history.replace({
      pathname: '/search',
      search: '?q=' + value
    });

    this.searchShow(value)
      .then(response => {
        if (!response)
          throw {emptyResponse: true}
        this.props.storeShows(response);

        if (response.length === 0)
          ReactGA.event(ga(TrackingCategory.SearchWithNoResults,
          'Empty search results', value));
        else
          ReactGA.event(ga(TrackingCategory.SuccessfulSearch,
          'Successful search', value));

        return this.setState({searchResults: response, showLoader: false});
      })
      .catch(errorResponse => {
        let isCancel = axios.isCancel(errorResponse.error);
        if (!isCancel && !(errorResponse.emptyResponse)) {
          ReactGA.event(ga(TrackingCategory.SearchFailed,
            'Search failed', value));
          this.setState({searchFailed: true, showLoader: false})
        }
      })
  };

  render() {
    const {showLoader, searchResults, searchQuery} = this.state;
    const {popularShows} = this.props;

    return <Container>
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

      <SearchResults searchResults={searchResults}
                     query={searchQuery}
                     onItemClick={() => this.setState({searchResultClicked: true})}
      />
      {popularShows.length !== 0 && <PopularShows shows={popularShows}/>}


    </Container>
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

const Container = styled.div`
  margin-bottom: 50px;
`;