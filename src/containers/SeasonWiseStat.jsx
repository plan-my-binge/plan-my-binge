import React, {Component} from "react";
import styled from 'styled-components';
import {toDaysHoursAndMinutes} from "../utils/TimeUtils";
import {Colors} from "../utils/Constants";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/all";

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
    let rightArrowActive = (page <= totalNumberOfPages) * 1;

    let paginate = (paginateBy) => {
      let isPaginationDisabled = paginateBy === -1 ? !leftArrowActive : !rightArrowActive;
      if (isPaginationDisabled) return;
      this.setState({page: page + paginateBy})
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
      <PaginationHint>Showing seasons {offset + 1} - {Math.min(limit, detail.seasonWiseEpisodes.length)} of
        total {detail.seasonWiseEpisodes.length} seasons</PaginationHint>
      <Pagination>
        <ButtonStyled onClick={() => paginate(-1)} disabled={!leftArrowActive}>
          <LeftArrow isactive={leftArrowActive}/>
          Prev
        </ButtonStyled>

        <ButtonStyled disabled={!rightArrowActive} onClick={() => paginate(1)}>
          Next
          <RightArrow isactive={rightArrowActive}/>
        </ButtonStyled>
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
