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
  margin: auto;
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none;    /* Firefox all             */
  -ms-user-select: none;     /* IE 10+                  */
  user-select: none;  
`;

const Option = styled.span`
  padding: 8px;
  width: 2.6rem;
  font-size: 1.3rem;
  margin: auto;
  color:${Colors.darkGray};
  cursor: pointer;
  margin: auto;
`;


const SelectedOption = styled.span`
  width: 4.4rem;
  font-size: 2.2rem;
  padding: 0 10px 0 10px;
  font-weight: 500;
  margin: auto;
  line-height: 1.2;
`;

const Units = styled.span`
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