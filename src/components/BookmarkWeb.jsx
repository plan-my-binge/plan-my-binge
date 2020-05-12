import React from "react";
import styled from "styled-components";
import {Colors} from "../utils/Constants";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

export const BookmarkWeb = ({flag, pmbId, className, toggleBookmark}) => {
  return <Container onClick={() => toggleBookmark(pmbId)}
                    className={"d-none d-md-flex"}>
    {flag ? <StarIconStyled/> : <StarBorderIconStyled/>}
    {<BookmarkLabel>{flag ? "Remove bookmark" : "Add Bookmark"}</BookmarkLabel>}
  </Container>
};

const StarBorderIconStyled = styled(StarBorderIcon)`
  margin: auto 5px;
`;

const StarIconStyled = styled(StarIcon)`
  margin: auto 5px;
`;

const BookmarkLabel = styled.div`
  
`;

const Container = styled.div`
   margin-left: 0px;
   margin-top: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   height: 3rem;
   line-height: 3rem;
   background-color: ${Colors.white};
   color: ${Colors.darkGray};
   //border: 2px solid ${Colors.gray};
   cursor: pointer;
   
   &:hover {
     color: ${Colors.black};   
   }
`;

