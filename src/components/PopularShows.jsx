import React from "react";
import styled from 'styled-components';
import {ShowList} from "./ShowList.jsx";

export const PopularShows = ({shows}) => {
  return <Container>
    <Heading>Check runtime of Popular Shows</Heading>
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
