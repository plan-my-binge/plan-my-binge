import React, {useState} from "react";
import MinusIcon from "../icons/MinusIcon.jsx";
import PlusIcon from "../icons/PlusIcon.jsx";
import styled from 'styled-components';

export const InputStepper = ({min, max, value, onChange}) => {

  const [disableMin, setDisableMin] = useState(false);
  const [disableMax, setDisableMax] = useState(false);

  return <Container>
      <MinusIcon disable={disableMin} onClick={() => {
        if (value - 1 >= min)
          onChange(value - 1);
        if (value - 1 === min)
          setDisableMin(true)
        if (value + 1 <= max)
          setDisableMax(false)
      }}/>
        {value}
      <PlusIcon
        disable={disableMax}
        onClick={() => {
        if (value + 1 <= max)
          onChange(value + 1);
        if (value + 1 === max)
          setDisableMax(true)
        if (value + 1 >= min)
          setDisableMin(false)
      }}/>
    </Container>
};

const Container = styled.span`
  margin: 5px;
`;
