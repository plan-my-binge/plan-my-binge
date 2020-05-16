import React from "react";
import {ShowList} from "./ShowList.jsx";
import styled from "styled-components";
import {Colors, cssForPhoneAndTablet} from "../utils/Constants";
import {useHistory, withRouter} from "react-router-dom";
import {AppHeader} from "./AppHeader";
import {RecentlyVisitedPlaceholderPageWithRouter} from "./RecentlyVisitedPlaceholderPage";

const RecentlyVisitedShowsPage = ({recentlyVisitedShows, popularShows}) => {

  const history = useHistory();

  return <Container>
    <AppHeader history={history} title={"Recently Visited Shows"}/>

    {recentlyVisitedShows.length !== 0 ? <>
      <Header>Recenly Visited Shows</Header>
      <ShowListStyled>
        <ShowList shows={recentlyVisitedShows}/>
      </ShowListStyled>
    </> : <RecentlyVisitedPlaceholderPageWithRouter popularShows={popularShows}/>}

  </Container>
};

export const RecentlyVisitedShowsPageWithRouter = withRouter(RecentlyVisitedShowsPage)

const Container = styled.div`
  clear: both;
  margin-bottom: 50px;
`;

const Header = styled.h4`
  padding: 20px;
  margin: 0;
  ${cssForPhoneAndTablet} {
    text-align: center;
  }
`;

const BackLink = styled.a`
  color: ${Colors.black};
  font-size: 1.5rem;
  &:hover {
    color: ${Colors.darkGray};
    text-decoration: none;
    border-radius: 10px;
  }
`;

const ShowListStyled = styled.div`
  margin: 20px;
`;