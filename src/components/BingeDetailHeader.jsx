import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import styled from "styled-components";
import {Colors} from "../utils/Constants";

export const BingeDetailHeader = (props) => {
  const {detail} = props;
  let year = detail.startYear + (detail.endYear ? `-${detail.endYear}` : "");
  let genre = detail.genres;
  let hint = `${year} • imdb ${detail.averageRating} • ${genre}`;

  return <Row>
    <Col>
      <HeaderContainer>
        <Header>{detail.primaryTitle}</Header>
        <HintContainer>
          <span>{hint}</span>
        </HintContainer>
      </HeaderContainer>
    </Col>
  </Row>;

}


const Header = styled.h3`
  margin-top: 15px;
  margin-bottom: 0;
`;
const HintContainer = styled.div`
  color: ${Colors.darkGray};
  font-size: 1rem;
`;


const HeaderContainer = styled.div`
`;