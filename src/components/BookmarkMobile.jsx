import React from "react";
import styled from "styled-components";
import {Colors} from "../utils/Constants";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

export const BookmarkMobile = ({flag, pmbId, toggleBookmark}) => {
  return <Container onClick={() => toggleBookmark(pmbId)}
                    className={"d-flex d-md-none"}>
    {flag ? <StarIconStyled/> : <StarBorderIconStyled/>}
  </Container>
};

const StarBorderIconStyled = styled(StarBorderIcon)`
  margin: auto 5px;
`;

const StarIconStyled = styled(StarIcon)`
  margin: auto 5px;
`;


const Container = styled.div`
   margin-left: 0px;
   margin-top: 0;
   background-color: ${Colors.white};
   color: ${Colors.darkGray};
   cursor: pointer;
   
   &:hover {
     color: ${Colors.black};   
   }
`;

