import React from "react";
import {toUpper} from "ramda";
import styled from 'styled-components';
import moment from "moment";
import {Colors} from "../utils/Constants";
import Col from "react-bootstrap/Col";


export const BingeCalendar = ({days}) => {
  days = days || 1;

  let today = moment();
  let completionDate = moment().add(days, 'day');

  let currentWeek = moment().startOf('week');
  let nextWeek = moment().add(1, 'week');

  let completionWeek = moment().add(days, 'day').startOf('week');
  let penultimateWeek = moment(completionWeek).add(-1, 'week');

  let totalWeeks = completionWeek.week() - currentWeek.week() + 1;

  return <Container>
    <Month>
      {toUpper(today.format("MMMM"))}
    </Month>

    {daysOfWeek()}
    {getWeekCalendar(currentWeek, completionDate)}
    {getWeekCalendar(nextWeek, completionDate)}
    {totalWeeks > 4 && <Middots> + {totalWeeks - 4} weeks + </Middots>}

    {moment().month() !== completionDate.month() &&
    <Month>{toUpper(completionDate.format('MMMM'))}</Month>}

    {totalWeeks >= 3 && getWeekCalendar(penultimateWeek, completionDate)}
    {totalWeeks >= 4 && getWeekCalendar(completionWeek, completionDate)}
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

  const addDays = n => (moment(startOfWeek).add(n, 'day'));
  const isActive = date => date.isSameOrAfter(moment(), 'day') &&
      date.isSameOrBefore(completionDate, 'day');

  return <Week>
    <Date active={isActive(addDays(0))} >{addDays(0).date()}</Date>
    <Date active={isActive(addDays(1))} >{addDays(1).date()}</Date>
    <Date active={isActive(addDays(2))} >{addDays(2).date()}</Date>
    <Date active={isActive(addDays(3))} >{addDays(3).date()}</Date>
    <Date active={isActive(addDays(4))} >{addDays(4).date()}</Date>
    <Date active={isActive(addDays(5))} >{addDays(5).date()}</Date>
    <Date active={isActive(addDays(6))} >{addDays(6).date()}</Date>
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

const Middots = styled.div`
  margin: auto;
`;
