import {showRuntimeToUserRuntime, toDaysHoursAndMinutes} from "../utils/TimeUtils";
import {Link} from "react-router-dom";
import React from "react";
import styled from "styled-components";
import {Colors} from "../utils/Constants";
import AccessTimeIcon from '@material-ui/icons/AccessTime';

export const ShowItem = ({detail, markShowAsVisited, userBingeTime}) => {
  let userRuntime = showRuntimeToUserRuntime(userBingeTime, detail);
  let runtime = toDaysHoursAndMinutes(userRuntime);
  let daysDisplay = `${runtime.days ? runtime.days + "d " : ""}`;
  let hoursDisplay = `${runtime.hours ? runtime.hours + "h " : ""}`;
  let minutesDisplay = `${runtime.minutes}m`;

  return <Item onClick={() => markShowAsVisited(detail.pmbId)}
               to={{
                 pathname: "/binge/" + detail.pmbId,
                 data: detail
               }}>

    {detail.portraitPoster ? <Poster src={detail.portraitPoster}/> :
      <PosterPlaceholder>{detail.primaryTitle[0]}</PosterPlaceholder>
    }
    <Runtime>
      {detail.runtime !== 0 && <AccessTimeIcon fontSize={"small"}
                                         style={{paddingRight: 4, marginBottom: 2}}/>}
      {detail.runtime !== 0 && `${daysDisplay}${hoursDisplay}${minutesDisplay}`}
    </Runtime>
    <Title>{detail.primaryTitle}</Title>
  </Item>
};

const Poster = styled.img`
  height: 12rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const PosterPlaceholder = styled.div`
  height: 12rem;
  width: 8rem;
  background-color: ${Colors.darkCyan};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  color: ${Colors.white};
`;

const Item = styled(Link)`
  color: ${Colors.black};
  cursor: pointer;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 30px;
  float: right;
  font-size: 0.9rem;
  display: table;
`;


const Title = styled.div`
  ${Item}:hover & {
    text-decoration: underline;
    color: ${Colors.black};
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
  background-color: ${Colors.darkCyan};
  padding-right: 5px;
  padding-left: 5px;
  padding-top: 5px;
  margin-top: -5px;
  font-size: 0.9rem;
  text-align: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  
  
  ${Item}:hover & {
    text-decoration: none !important;
  }
`;

const LinkStyled = styled.div`
  
`