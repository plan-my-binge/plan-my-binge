import React, {Component} from "react";
import styled from 'styled-components';
import {toDaysHoursAndMinutes} from "../utils/TimeUtils";
import {Colors} from "../utils/Constants";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/all";

const getNumberOfElementsToDisplay = () => {
  return 0;
};

export class SeasonWiseStat extends Component<{}> {

  constructor(props: P, context: any) {
    super(props, context);
    this.state = {
      page: 1,
      pageSize: 5
    }
  }

  render() {
    let {detail} = this.props;
    let {page, pageSize} = this.state;
    let totalNumberOfPages = Math.floor(detail.seasonWiseEpisodes.length / 6) + 1;

    let leftArrowActive = (page !== 1) * 1;
    let rightArrowActive = (page !== totalNumberOfPages) * 1;

    let paginate = (paginateBy) => {
      let isPaginationDisabled = paginateBy === -1 ? !leftArrowActive : !rightArrowActive;
      if (isPaginationDisabled) return;
      this.setState({page: page + paginateBy})
    };

    let paginateTo = (paginateTo) => {
      this.setState({page: paginateTo})
    };

    let offset = (page - 1) * pageSize;
    let limit = page * pageSize;
    return <>
      <Container>
        {detail.seasonWiseEpisodes.slice(offset, limit).map((numberOfEpisodes, index) => {
          let runtime = toDaysHoursAndMinutes(detail.seasonWiseRuntime[index]);
          let daysDisplay = `${runtime.days ? runtime.days + "d " : ""}`;
          let hoursDisplay = `${runtime.hours ? runtime.hours + "h " : ""}`;
          let minutesDisplay = `${runtime.minutes}m`;

          return <StatBlock key={index}>
            <SeasonNumber>Season {(index + 1) + ((page - 1) * pageSize)}</SeasonNumber>
            <NumberOfEpisodes>{numberOfEpisodes} Episodes</NumberOfEpisodes>
            <Runtime>{`${daysDisplay}${hoursDisplay}${minutesDisplay}`} Runtime</Runtime>
          </StatBlock>
        })}
      </Container>
      <PaginationHint>Showing seasons {offset + 1} - {Math.min(limit, detail.seasonWiseEpisodes.length)} of total {detail.seasonWiseEpisodes.length} seasons</PaginationHint>
      <Pagination>
        <LeftArrow isactive={leftArrowActive} onClick={() => paginate(-1)}/>

        {page > 2 ?
          <Option onClick={() => paginateTo(1)}>• •</Option> : <Option/>}
        {page > 1 ?
          <Option onClick={() => paginate(-1)}>{page - 1}</Option> : <Option/>}

        <SelectedOption>{page}</SelectedOption>

        {page < totalNumberOfPages ?
          <Option onClick={() => paginate(1)}>{page + 1}</Option> : <Option/>}
        {page < (totalNumberOfPages - 1) ?
          <Option onClick={() => paginateTo(totalNumberOfPages)}>• •</Option> : <Option/>}

        <RightArrow isactive={rightArrowActive} onClick={() => paginate(1)}/>
      </Pagination>
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

const RuntimeNumber = styled.span`
  color: black;
  font-size: 0.9rem;
`;

const Option = styled.span`
  padding: 8px;
  width: 2.6rem;
  font-size: 1.3rem;
  margin: auto;
  color:${Colors.darkGray};
  cursor: pointer;
  `;

const SelectedOption = styled.span`
  width: 4.4rem;
  font-size: 2.2rem;
  padding: 0 10px 0 10px;
  font-weight: 500;
  margin: auto;
  line-height: 1.2;
`;

const LeftArrow = styled(MdKeyboardArrowLeft)`
  margin: auto;
  width: 1.7rem;
  font-size: 1.7rem;
  cursor: ${({isactive}) => isactive ? "pointer" : "not-allowed"};
  color: ${({isactive}) => isactive ? Colors.black : Colors.darkGray};
`;

const RightArrow = styled(MdKeyboardArrowRight)`
  margin: auto;
  width: 1.7rem;
  font-size: 1.7rem;
  cursor: ${({isactive}) => isactive ? "pointer" : "not-allowed"};
  color: ${({isactive}) => isactive ? Colors.black : Colors.darkGray};
`;

const Pagination = styled(Row)`
  width: fit-content;
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
