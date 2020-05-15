import React from "react";
import styled from "styled-components";
import {Colors} from "../utils/Constants";
import {useHistory, withRouter} from "react-router-dom";
import {PopularShows} from "./PopularShows";
import {SearchIcon} from "../icons/SearchIcon";
import {HistoryIcon} from "../icons/HistoryIcon";

export const RecentlyVisitedPlaceholderPage = ({popularShows}) => {
  let history = useHistory();
  return <Container>
    <HistoryIcon style={{color: Colors.darkGray, width: "10rem", height: "10rem"}}/>
    <NoBookmark>No Recent Activity</NoBookmark>
    <StartBookmarking>
      Your recently visited TV shows will appear here
    </StartBookmarking>
    <a onClick={() => history.push("/search")}>
      <Button>
      <SearchIcon/>
      Search TV shows
      </Button>
    </a>
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
