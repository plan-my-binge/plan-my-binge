import React from "react";
import styled from "styled-components";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const toDaysHoursAndMinutes = (totalMinutes) => {
  let minutesPerHours = 60;
  let hoursPerDay = 24;
  let days = Math.floor(totalMinutes / (minutesPerHours * hoursPerDay)); //
  let hours = Math.floor((totalMinutes - (days * (minutesPerHours * hoursPerDay))) / minutesPerHours);
  let minutes = Math.round(totalMinutes % minutesPerHours);

  return {days, hours, minutes};
};

export const BingeTime = (props) => {
  let bingeTime = toDaysHoursAndMinutes(props.runtime);

  let showHours = bingeTime.hours !== null && bingeTime.hours !== 0;
  let showDays = bingeTime.days !== null && bingeTime.days !== 0;
  return <Row>

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
  </Row>
};


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
  padding: 20px;
`;


