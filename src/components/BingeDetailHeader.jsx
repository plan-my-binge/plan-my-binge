import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import styled from "styled-components";
import {Colors} from "../utils/Constants";
import {BookmarkMobile} from "./BookmarkMobile";

export const BingeDetailHeader = (props) => {
  const {detail, bookmark, pmbId, toggleBookmark} = props;
  let year = detail.startYear + (detail.endYear ? `-${detail.endYear}` : "");
  let genre = detail.genres;
  let hint = `${year} • imdb ${detail.averageRating} • ${genre}`;

  return <Row>
    <Col>
      <HeaderContainer>
        <HeaderAndBookmark>
          <Header>{detail.primaryTitle}</Header>
          <BookmarkMobile flag={bookmark} pmbId={pmbId} toggleBookmark={toggleBookmark}/>
        </HeaderAndBookmark>
        <HintContainer>
          <span>{hint}</span>
        </HintContainer>
      </HeaderContainer>
    </Col>
  </Row>;

}


const Header = styled.h3`
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
