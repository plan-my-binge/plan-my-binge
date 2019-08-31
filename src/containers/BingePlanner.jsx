import React, {Component} from 'react';
import styled from 'styled-components';
import {recommendations} from "../data/bingeDetails";
import {BingeDetail} from "./BingeDetail.jsx";

export class BingePlanner extends Component<Props> {

  constructor(props: P, context: any) {
    super(props, context);
    this.state = {
      recommendations: []
    }
  }

  componentDidMount(): void {
    this.setState({recommendations})
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
          <BingeDetail detail={recommendations[0]}/>
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
