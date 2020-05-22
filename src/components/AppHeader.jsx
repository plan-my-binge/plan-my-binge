import React from "react";
import styled from "styled-components";
import {Classes, Colors, TrackingCategory} from "../utils/Constants";
import AppLogo from "../icons/Logo";
import {ArrowBackIcon} from "../icons/ArrowBackIcon";
import ReactGA from "react-ga";
import {ga} from "../utils/apiUtils";
import {SearchIcon} from "../icons/SearchIcon";
import {Link, withRouter, useLocation} from "react-router-dom";

const AppHeaderComponent = ({history, title}) => {
  const location = useLocation();
  let onClick = () => {
    ReactGA.event(ga(TrackingCategory.AppHeaderSearchButton,
      'Clicked app header search button', ""));
  };

  let onBackButtonClick = () => {
    ReactGA.event(ga(TrackingCategory.BackButtonClick,
      'Clicked back button', ""));
    return history.goBack();
  };

  return <Header>
    <BackLink
      data-nosnippet
      onClick={onBackButtonClick}>
      <ArrowBackIcon fontSize={"large"}/>
      <span className={Classes.showFlexInLargeScreen}>Back</span>
    </BackLink>

    {!process.env.SSR &&
    <LogoContainer className={Classes.showFlexInSmallerScreen}>
      <AppLogoContainer onClick={() => history.push("/")}>
        <AppLogo/>
      </AppLogoContainer>
    </LogoContainer>}

    {!location.pathname.startsWith("/search") &&
    <SearchLink to={"/search"} onClick={onClick}>
      <SearchIcon style={{marginRight: 10}} fontSize={"large"}/></SearchLink>}
  </Header>
};

export const AppHeader = withRouter(AppHeaderComponent);
const Header = styled.div`
  border-bottom: 1px solid ${Colors.darkGray};
  padding-top: 10px;
  padding-bottom: 10px;
  position: sticky;
  top: 0;
  right: 0;
  left: auto;
  height: 60px;
  z-index: 999;
  background-color: ${Colors.gray};
  display:flex;
  justify-content: space-between;
  align-items:center;;
`;


const BackLink = styled.a`
  display: flex;
  left: 10px;
  color: ${Colors.black};
  font-size: 1.5rem;
  
  
  &:hover {
    color: ${Colors.darkGray};
    text-decoration: none;
    border-radius: 10px;
  }
`;

const LogoContainer = styled.div`
  flex-grow:1;      
  text-align:center;
  margin: auto;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const AppLogoContainer = styled.div`
  width: 8rem; 
`;


const SearchLink = styled(Link)`
  color: ${Colors.black};
  
  &:hover {
     color: ${Colors.black};
  }
`;