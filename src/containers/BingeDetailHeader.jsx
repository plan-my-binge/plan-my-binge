import {trim} from "ramda";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import styled from "styled-components";
import {Colors} from "../utils/Constants";

const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export const BingeDetailHeader = (props) => {
  const {detail} = props;
  let year = detail.startYear + (detail.endYear ? `-${detail.endYear}` : "");
  let genre = detail.genre.split(',').map(trim).map(capitalizeFirstLetter).join(", ");
  let hint = `${year} • imdb ${detail.averageRating} • ${genre}`;

  return <Row>
    <Col>
      <HeaderContainer>
        <Header>{detail.title}</Header>
        <HintContainer>
          <span>{hint}</span>
        </HintContainer>
      </HeaderContainer>
    </Col>
  </Row>;

}


const Header = styled.h3`
  margin-bottom: 0;
`
const HintContainer = styled.div`
  color: ${Colors.darkGray};
  font-size: 1rem;
`


const HeaderContainer = styled.div`
`