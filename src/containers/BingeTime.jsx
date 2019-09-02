import React from "react";
import styled from "styled-components";
import {toDaysHoursAndMinutes} from "../utils/TimeUtils";
import Row from "react-bootstrap/Row";


export const BingeTime = (props) => {
  let bingeTime = toDaysHoursAndMinutes(props.runtime);

  let showHours = bingeTime.hours !== null /*&& bingeTime.hours !== 0*/;
  let showDays = bingeTime.days !== null && bingeTime.days !== 0;
  return <>
    <Container>

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
    </Container>
    <Row><TimeSliderHint>to watch all the episodes of {props.title}</TimeSliderHint> </Row>
  </>
};

const Container = styled.div`
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

const BingeTimeBox = styled.div`
  text-align: center;
  padding: .7rem;
`;


const TimeSliderHint = styled.div`
  margin: auto;
  font-size: 0.9rem;
`;


