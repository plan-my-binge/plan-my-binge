import React, {Component} from "react";
import {SearchResults} from "./SearchResults.jsx";
import styled from "styled-components";
import {withRouter} from "react-router-dom";
import {Colors} from "../utils/Constants";
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {cachingApiRequest, createSearchQuery} from "../utils/apiUtils";
import axios from "axios";
import {ShowListShimmer} from "./ShowListShimmer";
import {Url} from "../service/api";
import {PopularShows} from "./PopularShows";

class SearchPage extends Component<{}> {

  state = {
    searchQuery: "",
    showLoader: false,
    searchResults: [],
    searchFailed: false,
    popularShows: []
  };

  request = cachingApiRequest();

  componentDidMount() {
    if (this.props.location.search) {
      let searchQuery = this.props.location.search.replace(/^\?q=/, "");
      searchQuery = decodeURIComponent(searchQuery);
      this.setState({searchQuery: searchQuery});
      this.handleInputChange(searchQuery)
    }

    this.request(Url.getPopularShows).then(data => this.setState({popularShows: data}))
  }

  searchShow = createSearchQuery();

  handleInputChange = (value) => {
    this.setState({searchQuery: value, showLoader: true});
    this.props.history.replace({
      pathname : '/search',
      search   : '?q=' + value
    });

    this.searchShow(value)
      .then(response => this.setState({searchResults: response, showLoader: false}))
      .catch(error => {
        let isCancel = axios.isCancel(error);
        if (isCancel) this.setState({showLoader: true});
        else this.setState({searchFailed: true, showLoader: false})
      })
  };

  render() {
    const {showLoader, searchResults, searchQuery, popularShows} = this.state;

    return <div>
      <SearchHeader>
        <IconContainer onClick={this.goBack()}>
          <ArrowBackIcon fontSize={"large"}/>
        </IconContainer>
        <h4> Search TV Show to calculate binge time</h4>
      </SearchHeader>
      <SearchContainer>
        <SearchIconStyled fontSize={"large"}/>
        <Input type={"text"} placeholder={"Search TV Show Eg. \"The Office\""} autoFocus
               value={searchQuery}
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

  goBack() {
    return this.props.history.length > 1 ?
      this.props.history.goBack() :
      this.props.history.push("/");
  }
}

export const SearchPageWithRouter = withRouter(SearchPage);
const SearchHeader = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 600;
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

const NoResultsFound = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Colors.darkGray};
`;
