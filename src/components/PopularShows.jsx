import React from "react";
import {BingeDetailModel} from "../data/BingeDetailModel";
import styled from 'styled-components';
import {Colors} from "../utils/Constants";
import {toDaysHoursAndMinutes} from "../utils/TimeUtils";
import {Link} from "react-router-dom";

export const PopularShows = ({shows}) => {
  return <ShowsList>
    <Heading>Check runtime of Popular Shows</Heading>
    {shows.map(show => <ShowItem key={show._source.primaryTitle} detail={new BingeDetailModel(show._source)}/>)}
  </ShowsList>
};

const ShowItem = ({detail}) => {
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

const Heading = styled.h4`
  padding: 5px;
`;
const ShowsList = styled.div`
  margin: 20px;
`;
const Poster = styled.img`
  height: 12rem;
`;

const Item = styled.div`
  color: ${Colors.black};
  cursor: pointer;
  margin-right: 30px;
  margin-bottom: 30px;
  float: left;
  font-size: 0.9rem;
`;

const Title = styled.div`
  ${Item}:hover & {
    text-decoration: underline;
  }
`;

const Runtime = styled.div`
  color: ${Colors.darkGray}
`;
