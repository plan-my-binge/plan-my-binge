import React from "react";
import styled from 'styled-components';
import {ShowList} from "./ShowList.jsx";
import {Link} from "react-router-dom";
import {Colors, cssForPhoneAndTablet} from "../utils/Constants";
import {ArrowForwardIcon} from "../icons/ArrowForward";

export const BookmarkedShows = ({shows}) => {
  return <Container>
    <StyledLink to={"/bookmarks"}>
      <Heading>Bookmarked Shows <ArrowForwardIcon fontSize={"2rem)"}/></Heading>
    </StyledLink>
    <ShowList shows={shows}/>
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