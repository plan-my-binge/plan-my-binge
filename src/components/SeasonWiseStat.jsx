import React, {Component} from "react";
import styled from 'styled-components';
import {seasonRuntimeToUserRuntime, toDaysHoursAndMinutes} from "../utils/TimeUtils";
import {Colors, TrackingCategory} from "../utils/Constants";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {PrevIcon} from "../icons/PrevIcon";
import {NextIcon} from "../icons/NextIcon";
import ReactGA from "react-ga";
import {ga} from "../utils/apiUtils";

export class SeasonWiseStat extends Component<{}> {

  constructor(props: P, context: any) {
    super(props, context);
    this.state = this.defaultState;
  }

  defaultState = {
    page: 1,
    pageSize: 5
  };

  componentDidUpdate(prevProps) {
    if (prevProps.detail.pmbId !== this.props.detail.pmbId) {
      this.setState(this.defaultState)
    }
  }

  render() {
    let {detail} = this.props;
    let {page, pageSize} = this.state;
    let totalNumberOfPages = Math.floor(detail.seasons.length / this.state.pageSize) + 1;

    let leftArrowActive = (page !== 1) * 1;
    let rightArrowActive = (page < totalNumberOfPages) * 1;

    let paginate = (paginateBy) => {

      let isPaginationDisabled = paginateBy === -1 ? !leftArrowActive : !rightArrowActive;
      if (isPaginationDisabled) return;
      let newPage = page + paginateBy;
      this.setState({page: newPage})

      ReactGA.event(ga(TrackingCategory.PaginateSeasonWiseStat,
        'Paginate season wise stats', newPage));
    };

    let offset = (page - 1) * pageSize;
    let limit = page * pageSize;

    return <>
      <Container>
        {detail.seasons.slice(offset, limit).map((season, index) => {
          let userRuntime = seasonRuntimeToUserRuntime(this.props.userBingeTime, season);
          let numberOfEpisodes = season.numberOfEpisodes;
          let runtime = toDaysHoursAndMinutes(userRuntime);
          let daysDisplay = `${runtime.days ? runtime.days + "d " : ""}`;
          let hoursDisplay = `${runtime.hours ? runtime.hours + "h " : ""}`;
          let minutesDisplay = `${runtime.minutes}m`;

          return <StatBlock key={index}>
            <SeasonNumber>Season {(index + 1) + ((page - 1) * pageSize)}</SeasonNumber>
            <NumberOfEpisodes>{numberOfEpisodes} Episodes</NumberOfEpisodes>
            {season.seasonRuntime && <Runtime>{`${daysDisplay}${hoursDisplay}${minutesDisplay}`} Runtime</Runtime>}
          </StatBlock>
        })}
      </Container>

      {detail.seasons.length > this.state.pageSize && <>
        <PaginationHint>Showing seasons {offset + 1} - {Math.min(limit, detail.seasons.length)} of
          total {detail.seasons.length} seasons</PaginationHint>
        <Pagination>
          <ButtonStyled onClick={() => paginate(-1)} disabled={!leftArrowActive}>
            <PrevIcon/>Prev
          </ButtonStyled>

          <ButtonStyled disabled={!rightArrowActive} onClick={() => paginate(1)}>
            Next<NextIcon/>
          </ButtonStyled>
        </Pagination>
      </>}
    </>
  }
}

const Container = styled(Row)`
  margin-top: 15px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
const StatBlock = styled(Col)`
  margin: 5px;
  background-color: ${Colors.gray};
  min-width: 230px;
  padding: 10px;
`;

const SeasonNumber = styled.div`
  font-weight: 600;
`;

const NumberOfEpisodes = styled.div`
  font-size: 0.9rem;
  float: left;
`;

const Runtime = styled.div`
  font-size: 0.9rem;
  float: right;
`;

// const LeftArrow = styled(ArrowBackIosIcon)`
//   margin: auto;
//   width: 1.7rem;
//   font-size: 1.7rem;
//   cursor: ${({isactive}) => isactive ? "pointer" : "not-allowed"};
//   color: ${({isactive}) => isactive ? Colors.black : Colors.darkGray};
// `;

// const RightArrow = styled(ChevronRightIcon)`
//   margin: auto;
//   width: 1.7rem;
//   font-size: 1.7rem;
//   cursor: ${({isactive}) => isactive ? "pointer" : "not-allowed"};
//   color: ${({isactive}) => isactive ? Colors.black : Colors.darkGray};
// `;

const Pagination = styled(Row)`
  width: fit-content;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const PaginationHint = styled.div`
  width: fit-content;
  margin: auto;
  font-size: 0.9rem;
  text-align: center;
  color: ${Colors.darkGray}
`

const ButtonStyled = styled.button`
  border: 0;
  outline:none;
  all: unset;
  margin: 10px;
  cursor: ${({disabled}) => disabled ? "not-allowed" : "pointer"};
  color: ${({disabled}) => disabled ? Colors.darkGray : Colors.black};
`;
