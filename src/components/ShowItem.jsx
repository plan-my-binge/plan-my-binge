import {toDaysHoursAndMinutes} from "../utils/TimeUtils";
import {Link} from "react-router-dom";
import React from "react";
import styled from "styled-components";
import {Colors} from "../utils/Constants";
import AccessTimeIcon from '@material-ui/icons/AccessTime';

export const ShowItem = ({detail, markShowAsVisited}) => {
  let runtime = toDaysHoursAndMinutes(detail.runtime);
  let daysDisplay = `${runtime.days ? runtime.days + "d " : ""}`;
  let hoursDisplay = `${runtime.hours ? runtime.hours + "h " : ""}`;
  let minutesDisplay = `${runtime.minutes}m`;

  return <Link
    onClick={() => markShowAsVisited(detail.pmbId)}
    to={{
      pathname: "/binge/" + detail.pmbId,
      data: detail
    }}>
    <Item>
      <Poster src={detail.portraitPoster}/>
      <Runtime><AccessTimeIcon fontSize={"small"} style={{paddingRight: 4, marginBottom: 2}}/>{`${daysDisplay}${hoursDisplay}${minutesDisplay}`}</Runtime>
      <Title>{detail.primaryTitle}</Title>
    </Item>
  </Link>
};

const Poster = styled.img`
  height: 12rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Item = styled.div`
  color: ${Colors.black};
  cursor: pointer;
  margin-right: 20px;
  margin-bottom: 30px;
  float: left;
  font-size: 0.9rem;
  display: table;
`;


const Title = styled.div`
  ${Item}:hover & {
    text-decoration: underline;
  }
  display: table-caption;
  caption-side: bottom;
  margin-top: 10px;
  font-weight: 700;
`;

const Runtime = styled.div`
  color: ${Colors.gray};
  display: table-caption;
  caption-side: bottom;
  //border: 1px solid ${Colors.darkGray};
  //width: fit-content;
  //border-radius: 10px;
  background-color: ${Colors.darkCyan};
  padding-right: 5px;
  padding-left: 5px;
  padding-top: 5px;
  margin-top: -5px;
  font-size: 0.9rem;
  text-align: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
