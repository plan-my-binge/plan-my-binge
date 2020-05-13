import React from "react";
import ShowItemContainer from "../containers/ShowItemContainer";
import styled from 'styled-components';
import {cssForPhoneAndTablet} from "../utils/Constants";

export const ShowList = ({shows}) => {
  return <Container>
    {shows.map(show =>
      <ShowItemContainer
        key={show.pmbId}
        detail={show}/>)}
  </Container>;
};

const Container = styled.div`
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  ${cssForPhoneAndTablet} {
    justify-content: center;
  }
`;
