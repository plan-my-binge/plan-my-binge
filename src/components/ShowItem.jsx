import {toDaysHoursAndMinutes} from "../utils/TimeUtils";
import {Link} from "react-router-dom";
import React from "react";
import styled from "styled-components";
import {Colors} from "../utils/Constants";

export const ShowItem = ({detail}) => {
  let runtime = toDaysHoursAndMinutes(detail.runtime);
  let daysDisplay = `${runtime.days ? runtime.days + "d " : ""}`;
  let hoursDisplay = `${runtime.hours ? runtime.hours + "h " : ""}`;
  let minutesDisplay = `${runtime.minutes}m`;

  return <Link to={{
    pathname: "/binge/" + detail.pmbId,
    data: detail
  }}>
    <Item>
      <Poster src={detail.portraitPoster}/>
      <Title>{detail.primaryTitle}</Title>
      <Runtime>{`${daysDisplay}${hoursDisplay}${minutesDisplay}`}</Runtime>
    </Item>
  </Link>
};

const Poster = styled.img`
  height: 12rem;
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
`;

const Runtime = styled.div`
  color: ${Colors.darkGray};
  display: table-caption;
  caption-side: bottom;
`;
