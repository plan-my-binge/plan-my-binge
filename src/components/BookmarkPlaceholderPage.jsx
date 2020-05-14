import React from "react";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import SearchIcon from '@material-ui/icons/Search';
import styled from "styled-components";
import {Colors} from "../utils/Constants";
import ButtonBase from "@material-ui/core/ButtonBase";
import {withRouter, useHistory} from "react-router-dom";
import {PopularShows} from "./PopularShows";

export const BookmarkPlaceholderPage = ({popularShows}) => {
  let history = useHistory();
  return <Container>
    <StarBorderIcon style={{color: Colors.darkGray, width: "10rem", height: "10rem"}}/>
    <NoBookmark>No bookmarks yet!</NoBookmark>
    <StartBookmarking>
      Tap the star on your favorite show to add it to your library
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

export const BookmarkPlaceholderPageWithRouter = withRouter(BookmarkPlaceholderPage);

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
