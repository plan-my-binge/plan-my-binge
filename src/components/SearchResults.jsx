import React from "react";
import {ShowList} from "./ShowList.jsx";
import styled from "styled-components";
import {BingeDetailModel} from "../data/BingeDetailModel";
import {cssForPhoneAndTablet, Referrer} from "../utils/Constants";

export const SearchResults = ({searchResults, query, onItemClick}) => {
  return <Container>
    {searchResults.length !== 0 && <Heading>Search results</Heading>}
    <ShowList shows={searchResults.map(show => BingeDetailModel(show._source))}
              referrer={Referrer.SearchResult}
              searchQueryReferrer={query}
              onItemClick={onItemClick}
    />

  </Container>
};


const Heading = styled.h4`
  padding: 5px;
  ${cssForPhoneAndTablet} {
    text-align: center;
  }
`;
const Container = styled.div`
  margin: 10px;
  clear: both;
`;
