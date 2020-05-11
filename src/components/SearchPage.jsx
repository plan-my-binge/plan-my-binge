import React, {Component} from "react";
import {SearchResults} from "./SearchResults.jsx";
import styled from "styled-components";
import {withRouter} from "react-router-dom";
import {Colors} from "../utils/Constants";
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {createSearchQuery} from "../utils/apiUtils";
import axios from "axios";

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
  }

  searchShow = createSearchQuery();

  handleInputChange = (value) => {
    this.setState({searchQuery: value, showLoader: true});
    this.props.history.replace({
      pathname : '/search',
      search   : '?q=' + value
    });

    this.searchShow(value)
      .then(response => this.setState({searchResults: response}))
      .catch(error => !axios.isCancel(error) && this.setState({searchFailed: true}))
      .finally(() => this.setState({showLoader: false}))
  };

  render() {
    return <div>
      <SearchHeader>
        <IconContainer onClick={() => this.props.history.goBack()}>
          <ArrowBackIcon fontSize={"large"}/>
        </IconContainer>
        <h4> Search TV Show to calculate binge time</h4>
      </SearchHeader>
      <SearchContainer>
        <SearchIconStyled fontSize={"large"}/>
        <Input type={"text"} placeholder={"Search TV Show Eg. \"The Office\""} autoFocus
               value={this.state.searchQuery}
               onChange={(e) => this.handleInputChange(e.target.value)}
        />
        <span/>
      </SearchContainer>
      <SearchResults searchResults={this.state.searchResults}/>
    </div>
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
