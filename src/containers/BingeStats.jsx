import Col from "react-bootstrap/Col";
import {Colors} from "../utils/Constants";
import Row from "react-bootstrap/Row";
import React from "react";
import styled from 'styled-components';

export const BingeStat = (props) => {
  let {detail} = props;
  return <Row >
    <Line>
      <div>
        <Number>{detail.numberOfSeasons}</Number>
        <Unit>Seasons</Unit>
      </div>
    </Line>
    <Line>
      <div>
        <Number>{detail.episodePerSeason[2]}</Number>
        <Unit>Episodes per Season</Unit>
      </div>
    </Line>
    <Line>
      <div>
        <Number>{detail.totalEpisodes}</Number>
        <Unit>Total Episodes</Unit>
      </div>
    </Line>
    <Line>
      <div>
        <Number>{detail.minutesPerEpisode[2]}</Number>
        <Unit>Minutes per Episode</Unit>
      </div>
    </Line>
  </Row>
};

const Line = styled(Col)`
  text-align: center;
  margin: 10px;
  min-width: 120px;
`;

const Number = styled.div`
  font-size: 2rem;
  font-weight: 400;
  margin: auto;
  width: fit-content;
`;

const Unit = styled.div`
  font-size: 0.9rem;
  color: ${Colors.darkGray};
  margin: auto;
  width: fit-content;
`;
