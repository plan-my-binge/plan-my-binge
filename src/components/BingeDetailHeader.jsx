import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import styled from "styled-components";
import {Colors} from "../utils/Constants";
import {BookmarkMobile} from "./BookmarkMobile";
import ImdbIcon from "../icons/ImdbIcon";

export const BingeDetailHeader = (props) => {
  const {detail, bookmark, pmbId, toggleBookmark} = props;
  let year = detail.startYear + (detail.endYear ? `-${detail.endYear}` : "");
  let genre = detail.genres.replace(/,/g, ", ");
  return <Row>
    <Col>
      <HeaderContainer>
        <HeaderAndBookmark>
          <Header>{detail.primaryTitle}</Header>
          <BookmarkMobile flag={bookmark} pmbId={pmbId} toggleBookmark={toggleBookmark}/>
        </HeaderAndBookmark>
        <HintContainer>
          <Hint>{`${year} • `} <ImdbIcon/>{` ${detail.averageRating} • ${genre}`}</Hint>
        </HintContainer>
      </HeaderContainer>
    </Col>
  </Row>;

}

const Hint = styled.span`
  display: flex;
  align-items: center;
`;
const Header = styled.h4`
  margin-bottom: 0;
  text-align: left;
`;
const HintContainer = styled.div`
  color: ${Colors.darkGray};
  font-size: 1rem;
`;


const HeaderContainer = styled.div`
`;

const HeaderAndBookmark = styled.div`
  display: flex;
  margin-top: 15px;
  align-items: center;
  justify-content: space-between;
`
