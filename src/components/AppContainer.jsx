import {Component} from "react";
import {NavigationMenus} from "./NavigationMenus.jsx";
import React from "react";
import styled from 'styled-components';
import {MainContent} from "./MainContent.jsx";
import {NavOptions} from "../utils/Constants";

export class AppContainer extends Component {


  constructor(props) {
    super(props);
    this.state = {
      menuSelection: NavOptions[0]
    }
  }

  render() {
    return <StyledContainer>
      <NavigationMenus onNavChange={(menuSelection) => this.setState({menuSelection})}
                       selection={this.state.menuSelection}/>
      <MainContent/>
    </StyledContainer>;
  }
}

const StyledContainer = styled.div`
  font-family: "Open Sans", "Helvetica Neue", Arial, sans-serif;
  line-height: 1.6;
  font-size: 18px;
  
  margin-top: 15px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;