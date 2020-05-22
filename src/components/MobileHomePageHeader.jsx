import React from "react";
import styled from "styled-components";
import {Link, withRouter, useHistory} from "react-router-dom";
import {Classes, Colors, TrackingCategory} from "../utils/Constants";
import AppLogo from "../icons/Logo";
import {SearchIcon} from "../icons/SearchIcon";
import ReactGA from "react-ga";
import {ga} from "../utils/apiUtils";

const MobileHomePageHeader = () => {
  const history = useHistory();

  const onInputClick = () => {
    ReactGA.event(ga(TrackingCategory.SearchInputClick,
      'Clicked home page search input', "HomePageSearchInput"));
  };

  let onLogoClick = (history) => {
    ReactGA.event(ga(TrackingCategory.AppLogoClick, 'Clicked mobile app logo header', "MobileAppLogoHeader"));
    return history.push("/");
  };

  return <Container>
    <HeaderMobile className={Classes.showFlexInSmallerScreen}>
      <AppLogoContainer  onClick={() => onLogoClick(history)}>
        {/*<AppLogo/>*/}
      </AppLogoContainer>
      {/*<HeaderMessage >*/}
      {/*  <h5>Find out how long it will take to watch all episodes of any TV Show</h5>*/}
      {/*</HeaderMessage>*/}

    </HeaderMobile>

    <HeaderWeb className={Classes.showFlexInLargeScreen}>
      <HeaderMessage >
        <h3>Find out how long it will take to watch all episodes of any TV Show</h3>
      </HeaderMessage>
    </HeaderWeb>

    <SearchContainer>
      <SearchIcon fontSize={"large"}/>
      <SearchLink to={"/search"} onClick={() => onInputClick()}>
        <Input type={"text"} placeholder={"Search TV Show Eg. \"The Office\""}/>
      </SearchLink>
      <span/>
    </SearchContainer>
  </Container>
};

export const MobileHomePageHeaderWithRouter = withRouter(MobileHomePageHeader);

const Container = styled.div`
`;

const HeaderMobile = styled.div`
  background-color: ${Colors.gray};
  padding: 10px;
  color: ${Colors.black};
  flex-direction: column;
  display: flex;
  align-items: center;
`;

const HeaderWeb = styled.div`
  padding: 10px;
  color: ${Colors.black};
  font-weight: bold;
  flex-direction: column;
  justify-content: center;
`;

const Logo = styled.img`
  max-width: 300px;
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

const HeaderMessage = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 600;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 15px 15px 5px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin-top: 10px;
  padding: 5px 20px 20px;
`;

const Input = styled.input`
  height: 100%;
  width: 100%;
  font-size: 1.2rem;
  border-bottom: 1px solid gray;
  background-color: transparent;
  ~ span {
    height: 2px;
    background-color: #27ad8a;
  }
  
  &:focus span {
    width: 100%;
    transition: 0.5s;
  }
`;


const AppLogoContainer = styled.div`
  padding: 10px;
  width: 20rem;
  cursor: pointer;
`;