import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import styled from "styled-components";
import {Colors, TrackingCategory} from "../utils/Constants";
import {BookmarkMobile} from "./BookmarkMobile";
import {BookmarkWeb} from "./BookmarkWeb";
import ReactGA from "react-ga";
import {ga} from "../utils/apiUtils";

export const BingeDetailHeader = (props) => {
  const {detail, bookmark, pmbId, toggleBookmark} = props;
  let year = [detail.startYear, detail.endYear].filter(Boolean).join("-");
  let rating = `IMDB ${detail.averageRating}`;
  let genre = (detail.genres || "").replace(/,/g, ", ");

  let hint = [year, rating, genre].filter(Boolean).join(" • ")


  let toggleBookmarkMobile = () => {
    if (bookmark)
      ReactGA.event(ga(TrackingCategory.RemoveFromBookmarkMobile,
        'remove bookmark', detail.primaryTitle));
    else
      ReactGA.event(ga(TrackingCategory.AddToBookmarkMobile,
        'add bookmark', detail.primaryTitle));
    toggleBookmark()
  };


  let toggleBookmarkWeb = () => {
    if (bookmark)
      ReactGA.event(ga(TrackingCategory.RemoveFromBookmarkWeb,
        'remove bookmark', detail.primaryTitle));
    else
      ReactGA.event(ga(TrackingCategory.AddToBookmarkWeb,
        'add bookmark', detail.primaryTitle));
    toggleBookmark()
  };
  return <Row>
    <Col>
      <HeaderContainer>
        <HeaderAndBookmark>
          <Header>{detail.primaryTitle}</Header>
          <BookmarkMobile flag={bookmark} pmbId={pmbId} toggleBookmark={toggleBookmarkMobile}/>
          <BookmarkWeb pmbId={pmbId}
                       flag={bookmark}
                       toggleBookmark={toggleBookmarkWeb}/>
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
