import React from "react";
import {ShowList} from "./ShowList.jsx";
import styled from "styled-components";
import {Colors} from "../utils/Constants";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {withRouter, useHistory} from "react-router-dom";

const RecentlyVisitedShowsPage = ({recentlyVisitedShows}) => {

  const history = useHistory();

  return <Container>
    <Header>
      <BackLink onClick={() => history.goBack()}>
        <ArrowBackIcon fontSize={"large"}/> Recently Visited Shows
      </BackLink>
    </Header>
    <ShowListStyled>
      <ShowList shows={recentlyVisitedShows}/>
    </ShowListStyled>

  </Container>
};

export const RecentlyVisitedShowsPageWithRouter = withRouter(RecentlyVisitedShowsPage)

const Container = styled.div`
  margin: 10px;
  clear: both;
`;

const Header = styled.div`
  border-bottom: 1px solid ${Colors.gray};
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  position: fixed;
  top: 0;
  z-index: 999;
  background-color: ${Colors.white};
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
  margin: 60px 20px 20px;
`;