import React from "react";
import styled from 'styled-components';
import {ShowList} from "./ShowList.jsx";
import {Link} from "react-router-dom";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {Colors} from "../utils/Constants";

export const RecentlyVisitedShows = ({shows}) => {
  return <Container>
    <StyledLink to={"/recent"}>
      <Heading>Recently Viewed <ArrowForwardIcon fontSize={"large"}/></Heading>
    </StyledLink>
    <ShowList shows={shows}/>
  </Container>
};

const Heading = styled.h4`
  padding: 5px;
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