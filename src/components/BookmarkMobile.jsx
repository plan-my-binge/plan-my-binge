import React from "react";
import styled from "styled-components";
import {Colors} from "../utils/Constants";
import {StarBorderedIcon} from "../icons/StarBorderedIcon";
import {StarFilledIcon} from "../icons/StarFilledIcon";

export const BookmarkMobile = ({flag, pmbId, toggleBookmark}) => {
  return <Container data-nosnippet
                    onClick={() => toggleBookmark(pmbId)}
                    className={"d-flex d-md-none"}>
    {flag ? <StarIconStyled/> : <StarBorderIconStyled/>}
  </Container>
};

const StarBorderIconStyled = styled(StarBorderedIcon)`
  margin: auto 5px;
`;

const StarIconStyled = styled(StarFilledIcon)`
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

