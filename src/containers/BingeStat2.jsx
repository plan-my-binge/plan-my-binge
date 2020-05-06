import Col from "react-bootstrap/Col";
import {Colors} from "../utils/Constants";
import Row from "react-bootstrap/Row";
import React from "react";
import styled from 'styled-components';

export const BingeStat2 = (props) => {
  let {detail} = props;
  return <>
    <StatsRow>
      <StatCol>
      <Line>
        <div>
          <Number>{detail.numberOfSeasons}</Number>
          <Unit>seasons</Unit>
        </div>
      </Line>

        <Line>
          <div>
            <Number>{detail.episodePerSeason[2]}</Number>
            <Unit>episodes per season</Unit>
          </div>
        </Line>

      </StatCol>
      <StatCol>
      <Line>
        <div>
          <Number>{detail.totalEpisodes}</Number>
          <Unit>episodes</Unit>
        </div>
      </Line>
        <Line>
          <div>
            <Number>{detail.minutesPerEpisode[2]}</Number>
            <Unit>minutes per episode</Unit>
          </div>
        </Line>

      </StatCol>
    </StatsRow>
  </>
};

const Line = styled(Col)`
  text-align: center;
  background-color: ${Colors.gray};
  margin-bottom: 10px;
  padding: 5px;
`;

const Number = styled.div`
  font-size: 2rem;
  font-weight: 500;
  margin: auto;
  width: fit-content;
`;

const Unit = styled.div`
  font-size: 1rem;
  font-weight: 200;
  font-style: italic;
  color: ${Colors.darkGray};
  margin: auto;
  width: fit-content;
`;

const StatsRow = styled(Row)`
  margin: 15px auto auto;
  flex-grow: 0;
`;

const StatCol = styled(Col)`
  padding: 5px;
`;