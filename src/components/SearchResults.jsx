import React from "react";
import {ShowList} from "./ShowList.jsx";
import styled from "styled-components";

export const SearchResults = ({searchResults}) => {
  return <Container>
    <Heading>Search results</Heading>
    <ShowList shows={searchResults}/>
  </Container>
};


const Heading = styled.h4`
  padding: 5px;
`;
const Container = styled.div`
  margin: 10px;
`;
