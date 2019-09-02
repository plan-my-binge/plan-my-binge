import React from "react";
import styled from 'styled-components';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/all";
import Row from "react-bootstrap/Row";
import {Colors} from "../utils/Constants";

export const TimeSlider = (props) => {
  const {selection, slide} = props;

  let previous = selection - 1;
  previous = previous === 0 ? 24 : previous;

  let next = selection + 1;
  next = next === 25 ? 1 : next;

  return <Container>
    <Hint> When you watch</Hint>
      <Row>
        <LeftArrow onClick={() => slide(previous)}/>
        <Option onClick={() => slide(previous)}>{previous}</Option>
        <SelectedOption>{selection}</SelectedOption>
        <Option onClick={() => slide(next)}>{next}</Option>
        <RightArrow onClick={() => slide(next)}/>
      </Row>
    <Hint>hours a day,</Hint>
    <Hint>it would take</Hint>
  </Container>
};

const Container = styled.div`
  margin: auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: fit-content;
`;

const Option = styled.span`
  padding: 8px;
  width: 2.6rem;
  font-size: 1.3rem;
  margin: auto;
  color:${Colors.darkGray};
  cursor: pointer;
  `;

const SelectedOption = styled.span`
  width: 4.4rem;
  font-size: 2.2rem;
  padding: 0 10px 0 10px;
  font-weight: 500;
  margin: auto;
  line-height: 1.2;
`;

const LeftArrow = styled(MdKeyboardArrowLeft)`
  margin: auto;
  width: 1.7rem;
  font-size: 1.7rem;
  cursor: pointer;
`;

const RightArrow = styled(MdKeyboardArrowRight)`
  margin: auto;
  width: 1.7rem;
  font-size: 1.7rem;
  cursor: pointer;
`;

const Hint = styled.div`
  margin: auto;
  font-size: 0.9rem;
  width: fit-content;
`;
