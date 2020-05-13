import React from "react";
import styled from 'styled-components';
import {ShowList} from "./ShowList.jsx";
import {cssForPhoneAndTablet} from "../utils/Constants";

export const PopularShows = ({shows}) => {
  return <Container>
    <Heading>Check runtime of Popular Shows</Heading>
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
