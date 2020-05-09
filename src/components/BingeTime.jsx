import React from "react";
import styled from "styled-components";
import {toDaysHoursAndMinutes} from "../utils/TimeUtils";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Colors} from "../utils/Constants";

export const BingeTime = (props) => {
  let bingeTime = toDaysHoursAndMinutes(props.runtime);
  let showHours = bingeTime.hours !== null /*&& bingeTime.hours !== 0*/;
  let showDays = bingeTime.days !== null && bingeTime.days !== 0;

  return <Container>
    <Row>
      <TimeSliderHint>It will take</TimeSliderHint>
    </Row>
    <ValueContainer>
      {showDays && <BingeTimeBox>
        <BingeTimeValue>{bingeTime.days}</BingeTimeValue>
        <BingeTimeUnit>days</BingeTimeUnit>
      </BingeTimeBox>}
      {showHours && <BingeTimeBox>
        <BingeTimeValue>{bingeTime.hours}</BingeTimeValue>
        <BingeTimeUnit>hours</BingeTimeUnit>
      </BingeTimeBox>}
      <BingeTimeBox>
        <BingeTimeValue>{bingeTime.minutes}</BingeTimeValue>
        <BingeTimeUnit>minutes</BingeTimeUnit>
      </BingeTimeBox>
    </ValueContainer>
    <Row><TimeSliderHint>to watch all the episodes, when you watch</TimeSliderHint> </Row>
  </Container>
};

const ValueContainer = styled(Row)`
  width: fit-content;
  margin: auto;
  display: flex;
`

const BingeTimeValue = styled.div`
  font-size: 3rem;
  margin: auto;
  line-height: 1.2;
  font-weight: 600;
`;

const BingeTimeUnit = styled.div`
`;

const BingeTimeBox = styled(Col)`
  text-align: center;
  
  padding-right: .3rem;
  padding-left: .3rem;
  padding-bottom: .3rem;
  
  //margin-right: 10px;
  //margin-left: 10px;
  margin-bottom: 10px;
  width: 100px;
`;


const TimeSliderHint = styled.div`
  margin: auto;
  font-size: 0.9rem;
`;

const Container = styled.div`
  padding: 5px;
  background-color: ${Colors.gray};
`;

