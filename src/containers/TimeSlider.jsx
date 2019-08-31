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
    <Row>
      <LeftArrow onClick={() => slide(previous)}/>
      <Option onClick={() => slide(previous)}>{previous}</Option>
      <SelectedOption>{selection}</SelectedOption>
      <Option onClick={() => slide(next)}>{next}</Option>
      <RightArrow onClick={() => slide(next)}/>
    </Row>
  </Container>
};

const Container = styled.div`
  float: left;
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none;    /* Firefox all             */
  -ms-user-select: none;     /* IE 10+                  */
  user-select: none;  
`;

const Option = styled.span`
  padding: 8px;
  width: 2rem;
  font-size: 1.3rem;
  margin: auto;
  color:${Colors.darkGray};
  cursor: pointer;
`;

const SelectedOption = styled.span`
  width: 3rem;
  font-size: 2.2rem;
  padding: 10px;
  font-weight: 500;
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