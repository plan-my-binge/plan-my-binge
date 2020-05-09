import React, {Component} from 'react';
import styled from 'styled-components';
import {recommendations} from "../data/bingeData";
import {BingeDetail} from "./BingeDetail.jsx";
import {getPopularShows} from "../service/api";
import {BingeDetailShimmer} from "./BingeDetailShimmer.jsx";
import {Colors} from "../utils/Constants";
import {HomePageError} from "./HomePageError";

export class BingePlanner extends Component<Props> {

  constructor(props: P, context: any) {
    super(props, context);
    this.state = {
      recommendations: [],
      popularShows: [],
      showLoader: true,
      showError: false
    }
  }

  componentDidMount(): void {
    this.setState({recommendations})
    getPopularShows()
      .then(data => this.setState({popularShows: data}))
      .catch(() => this.setState({showError: true}))
      .finally(() => this.setState({showLoader: false}));
  }

  render() {
    return (
      <Container>
        <HeaderMessage>
          How long will it take to watch all episodes of a TV Show?
        </HeaderMessage>
        <SearchContainer>
          <Input type={"text"} placeholder={"Search TV Show Eg. Game of Thrones"}/>
          <span/>
        </SearchContainer>
        {this.state.popularShows.length !== 0 && <BingeDetail detail={recommendations[0]}/>}
        {this.state.showError && <HomePageError/>}
        {this.state.showLoader && <BingeDetailShimmer/>}
      </Container>
    )
  }
}


const Container = styled.div`
  padding: 20px;
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
