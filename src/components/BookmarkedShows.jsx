import React from "react";
import styled from 'styled-components';
import {ShowList} from "./ShowList.jsx";
import {Link, useHistory} from "react-router-dom";
import {Colors, cssForPhoneAndTablet, Referrer, TrackingCategory} from "../utils/Constants";
import {ArrowForwardIcon} from "../icons/ArrowForward";
import ReactGA from "react-ga";
import {ga} from "../utils/apiUtils";

export const BookmarkedShows = ({shows}) => {

  let onClick = () => {
    ReactGA.event(ga(TrackingCategory.ClickSectionHeader,
      'Clicked bookmark section header', "Bookmarks"));
  };

  return <Container>
    <StyledLink to={"/bookmarks"} onClick={onClick}>
      <Heading>Bookmarked Shows <ArrowForwardIcon fontSize={"2rem)"}/></Heading>
    </StyledLink>
    <ShowList shows={shows} referrer={Referrer.BookmarkSection}/>
  </Container>
};

const Heading = styled.h5`
  padding: 5px 5px 5px 0;
  margin-left: 10px;
  ${cssForPhoneAndTablet} {
    text-align: center;
  }
  
`;
const Container = styled.div`
  clear: both;
  margin: 20px;
`;

const StyledLink = styled(Link)`
  color: ${Colors.black};
  
  &:hover {
    color: ${Colors.darkGray};
    text-decoration: none;
  }
`;