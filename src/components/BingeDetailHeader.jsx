import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import styled from "styled-components";
import {Colors} from "../utils/Constants";
import {BookmarkMobile} from "./BookmarkMobile";
import {BookmarkWeb} from "./BookmarkWeb";

export const BingeDetailHeader = (props) => {
  const {detail, bookmark, pmbId, toggleBookmark} = props;
  let year = [detail.startYear, detail.endYear].filter(Boolean).join("-");
  let rating = `IMDB ${detail.averageRating}`;
  let genre = (detail.genres || "").replace(/,/g, ", ");

  let hint = [year, rating, genre].filter(Boolean).join(" • ")
  return <Row>
    <Col>
      <HeaderContainer>
        <HeaderAndBookmark>
          <Header>{detail.primaryTitle}</Header>
          <BookmarkMobile flag={bookmark} pmbId={pmbId} toggleBookmark={toggleBookmark}/>
          <BookmarkWeb pmbId={pmbId}
                       flag={bookmark}
                       toggleBookmark={toggleBookmark}/>
        </HeaderAndBookmark>
        <HintContainer>
          <Hint>{hint}</Hint>
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
