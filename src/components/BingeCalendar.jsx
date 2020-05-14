import React from "react";
import {range, toUpper} from "ramda";
import styled from 'styled-components';
import dayjs from 'dayjs';
import {Colors} from "../utils/Constants";
import Col from "react-bootstrap/Col";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(weekOfYear)


export const BingeCalendar = ({days}) => {

  let today = dayjs();
  let completionDate = dayjs().add(days, 'day');

  let currentWeek = dayjs().startOf('week');
  let nextWeek = dayjs().add(1, 'week').startOf('week');

  let completionWeek = dayjs().add(days, 'day').startOf('week');
  console.debug(today, completionDate, currentWeek, nextWeek, completionWeek, penultimateWeek, totalWeeks);
  let penultimateWeek = dayjs(completionWeek).add(-1, 'week');

  let totalWeeks = completionWeek.week() - currentWeek.week() + 1;


  return <Container>
    <Month>
      {toUpper(today.format("MMMM"))}
    </Month>

    {daysOfWeek()}
    {getWeekCalendar(currentWeek, completionDate)}
    {getWeekCalendar(nextWeek, completionDate)}
    {totalWeeks > 4 && <Hint> ••• {totalWeeks - 4} weeks hidden ••• </Hint>}



    {totalWeeks === 3 && getWeekCalendar(completionWeek, completionDate)}
    {totalWeeks > 3 && getWeekCalendar(penultimateWeek, completionDate)}
    {totalWeeks >= 4 && getWeekCalendar(completionWeek, completionDate)}
    {dayjs().month() !== completionDate.month() &&
    <Month>{toUpper(completionDate.format('MMMM'))}</Month>}
  </Container>
};

const daysOfWeek = () => {

  return <Week>
    <Day>S</Day>
    <Day>M</Day>
    <Day>T</Day>
    <Day>W</Day>
    <Day>T</Day>
    <Day>F</Day>
    <Day>S</Day>
  </Week>
};

const getWeekCalendar = (startOfWeek, completionDate) => {

  const dateOfWeek = n => (dayjs(startOfWeek).add(n, 'day'));

  const isActive = date => date.isSameOrAfter(dayjs(), 'day') &&
    date.isSameOrBefore(completionDate, 'day');

  return <Week>
    {
      range(0, 7).map(i => {
        let date = dateOfWeek(i);
        let isToday = dayjs().isSame(date, 'day');
        let isCompletionDate = dayjs(completionDate).isSame(date, 'day');

        if (isToday && isCompletionDate) {
          return <Date key={i} active={isActive(date)}>{date.date()}</Date>
        } else if (isToday) {
          return <StartOrEndDate key={i} active={isActive(date)}>TODAY</StartOrEndDate>
        } else if (isCompletionDate) {
          return <StartOrEndDate key={i} active={isActive(date)}>END</StartOrEndDate>
        } else {
          return <Date key={i} active={isActive(date)}>{date.date()}</Date>
        }
      })
    }
  </Week>
};

const Month = styled.div`
  margin: auto;
  font-size: 0.9rem;
  letter-spacing: 10px;
`;

const Container = styled.div`
  padding: 5px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.gray};
`;

const Week = styled(Col)`
    display: flex;
    flex-direction: row;
    width: fit-content;
    margin: auto;
`;

const StartOrEndDate = styled.div`
  border: 1px solid black;
  width: 2.5rem;
  margin: 5px;
  font-size: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  
  color: ${Colors.white};
  background-color: ${Colors.darkGray};

`;
const Date = styled.div`
  border: 1px solid black;
  width: 2.5rem;
  margin: 5px;
  font-size: 1rem;
  vertical-align: middle;
  text-align: center;
  display: table-cell;
  color: ${props => props.active ? Colors.white : Colors.black};
  background-color: ${props => props.active ? Colors.darkGray : Colors.white};
`;

const Day = styled.div`
  border: 1px solid black;
  width: 2.5rem;
  margin: 5px;
  font-size: 1rem;
  vertical-align: middle;
  text-align: center;
  display: table-cell;
  color: ${Colors.white};
  background-color: ${Colors.black};
`;

const Hint = styled.div`
  margin: auto;
  color: ${Colors.darkGray};
  font-weight: 300;
  font-size: 0.9rem;
`;
