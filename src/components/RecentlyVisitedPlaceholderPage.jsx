import React from "react";
import SearchIcon from '@material-ui/icons/Search';
import styled from "styled-components";
import {Colors} from "../utils/Constants";
import HistoryIcon from '@material-ui/icons/History';
import ButtonBase from "@material-ui/core/ButtonBase";
import {withRouter, useHistory} from "react-router-dom";
import {PopularShows} from "./PopularShows";

export const RecentlyVisitedPlaceholderPage = ({popularShows}) => {
  let history = useHistory();
  return <Container>
    <HistoryIcon style={{color: Colors.darkGray, width: "10rem", height: "10rem"}}/>
    <NoBookmark>No Recent Activity</NoBookmark>
    <StartBookmarking>
      Your recently visited TV shows will appear here
    </StartBookmarking>
    <ButtonBase onClick={() => history.push("/search")}>
      <Button>
      <SearchIcon/>
      Search TV shows
      </Button>
    </ButtonBase>
    {popularShows.length !== 0 && <PopularShows shows={popularShows}/>}
  </Container>
};

export const RecentlyVisitedPlaceholderPageWithRouter = withRouter(RecentlyVisitedPlaceholderPage)
const Button = styled.div`
  border: 2px solid ${Colors.darkGray};
  color: ${Colors.darkGray};
  border-radius: 0;
  font-size: 1.2rem;
  padding: 10px;
`;
const NoBookmark = styled.div`
  color: ${Colors.darkGray};
  font-size: 2rem;
`;

const StartBookmarking = styled.div`
   margin-top: 20px;
   margin-bottom: 20px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px;
  margin-top: 40px;
  text-align: center;
`;
