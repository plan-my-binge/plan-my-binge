import React from "react";
import {ShowList} from "./ShowList.jsx";
import styled from "styled-components";
import {Colors, cssForPhoneAndTablet} from "../utils/Constants";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {withRouter, useHistory} from "react-router-dom";
import {AppHeader} from "./AppHeader";

const RecentlyVisitedShowsPage = ({recentlyVisitedShows}) => {

  const history = useHistory();

  return <Container>
    <AppHeader history={history} title={"Recently Visited Shows"}/>
    <Header>Recenly Visited Shows</Header>
    <ShowListStyled>
      <ShowList shows={recentlyVisitedShows}/>
    </ShowListStyled>

  </Container>
};

export const RecentlyVisitedShowsPageWithRouter = withRouter(RecentlyVisitedShowsPage)

const Container = styled.div`
  clear: both;
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