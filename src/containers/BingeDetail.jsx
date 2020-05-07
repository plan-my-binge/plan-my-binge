import styled from 'styled-components';
import React, {Component} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {BingeDetailHeader} from "./BingeDetailHeader.jsx";
import {BingeTime} from "./BingeTime.jsx";
import {BingeCalendar} from "./BingeCalendar.jsx";
import {minutesToDays} from "../utils/TimeUtils";
import {SeasonWiseStat} from "./SeasonWiseStat.jsx";
import {BingeStats} from "./BingeStats.jsx";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select/Select";
import {Colors} from "../utils/Constants";
import {InputStepper} from "./InputStepper.jsx";

export class BingeDetail extends Component<{ detail: any }> {

  constructor(props: P, context: any) {
    super(props, context);
    this.state = {
      numberOfBingingHoursPerDay: 2,
      dailyBingeSetting: {
        value: 2,
        unit: "hours"
      },
      possibleDailyBinging: {
        hours: 24,
        episodes: (24 * 60) / props.detail.minutesPerEpisode[2]
      }
    }
  }

  defaultDailyBinging = {
    hours: 2,
    episodes: 1
  };

  render() {
    let {detail} = this.props;

    const {numberOfBingingHoursPerDay, numberOfEpisodesPerDay} = this.state;
    let runtimeInMinutes = this.state.dailyBingeSetting.unit === "hours" ?
      detail.runtime * (24 / (numberOfBingingHoursPerDay)) :
      this.numberOfEpisodesPerDayToMinutes(numberOfEpisodesPerDay);

    let numberOfDays = minutesToDays(detail.runtime, this.state.dailyBingeSetting.unit === "hours" ?
      numberOfBingingHoursPerDay : this.numberOfEpisodesPerDayToHours(numberOfEpisodesPerDay));
    return <Container>
      <BingeDetailHeader detail={detail}/>

      <BingeDetailContentRow>
        <PosterContainerCol className={"col-sm-auto"}>
          <PosterPortrait src={detail.posterLandscape} className={"d-block d-md-none"}/>
          <Poster src={detail.posterPortrait} className={"d-none d-md-block"}/>
        </PosterContainerCol>

        <BingeTimeContainerCol>
          <BingeStats detail={detail}/>
          <BingeTimeAndCalenderContainer>
            <BingeTime runtime={runtimeInMinutes} title={detail.title}/>
            {this.getDailyBingeTime()}
            <BingeCalendar days={numberOfDays} title={detail.title}/>
          </BingeTimeAndCalenderContainer>
        </BingeTimeContainerCol>
        <Col>
          <SeasonWiseStat detail={detail}/>
        </Col>
      </BingeDetailContentRow>
    </Container>
  }

  numberOfEpisodesPerDayToMinutes(numberOfEpisodesPerDay) {
    return (24 / numberOfEpisodesPerDay) * 60 * this.props.detail.totalEpisodes;
  }

  numberOfEpisodesPerDayToHours(numberOfEpisodesPerDay) {
    return (24 / numberOfEpisodesPerDay) * this.props.detail.totalEpisodes;
  }

  getDailyBingeTime() {
    let maxLimit = this.state.dailyBingeSetting.unit === "episodes" ?
      this.state.possibleDailyBinging.episodes : this.state.possibleDailyBinging.hours;

    return <DailyBingTime>
      <TimeSliderHint>


        <InputStepper
          min={1}
          max={maxLimit}
          value={this.state.dailyBingeSetting.value}
          onChange={this.onDailyBingingSettingValueChanged()}
        />

        <SelectStyled
          onChange={this.onDailyBingingSettingUnitChanged()}
          value={this.state.dailyBingeSetting.unit}>
          <MenuItem value={"hours"}> hours </MenuItem>
          <MenuItem value={"episodes"}> episodes </MenuItem>
        </SelectStyled>

        a day
      </TimeSliderHint>
    </DailyBingTime>;
  }

  onDailyBingingSettingUnitChanged() {
    return (event) => {
      let unit = event.target.value;
      if (unit === "episodes") {
        this.setState({
          dailyBingeSetting: {unit: unit, value: this.defaultDailyBinging.episodes},
          numberOfEpisodesPerDay: this.defaultDailyBinging.episodes,
          numberOfBingingHoursPerDay: null

        })
      } else {
        this.setState({
          dailyBingeSetting: {unit: unit, value: this.defaultDailyBinging.hours},
          numberOfBingingHoursPerDay: this.defaultDailyBinging.hours,
          numberOfEpisodesPerDay: null
        })
      }
    };
  }

  onDailyBingingSettingValueChanged() {
    return (value) => this.setState(
      {
        dailyBingeSetting: {...this.state.dailyBingeSetting, value: value},
        numberOfBingingHoursPerDay:
          this.state.dailyBingeSetting.unit === "hours" ? value : null,
        numberOfEpisodesPerDay:
          this.state.dailyBingeSetting.unit === "episodes" ? value : null
      });
  }
}


const Container = styled.div`
`;

const Poster = styled.img`
   width: 16rem;
`;

const PosterPortrait = styled.img`
    width: 100%;
    width: -moz-available;          /* WebKit-based browsers will ignore this. */
    width: -webkit-fill-available;  /* Mozilla-based browsers will ignore this. */
    width: fill-available;
    margin: auto
`;

const BingeDetailContentRow = styled(Row)`
  display: flex;
  flex-direction: row;
`;


const PosterContainerCol = styled(Col)`
  padding-right: 5px;
  padding-left: 5px;
  margin-top: 15px;
`;

const BingeTimeContainerCol = styled(Col)`
  padding-right: 15px;
  padding-left: 15px;
`;

const BingeTimeAndCalenderContainer = styled.div`
  padding: 5px;
`;

const SelectStyled = styled(Select)`
  margin-right: 5px;
  margin-left: 5px;
  margin-bottom: 10px;
`;

const TimeSliderHint = styled.div`
  margin: auto;
  font-size: 0.9rem;
`;

const DailyBingTime = styled.div`
  background-color: ${Colors.gray};
  text-align: center;
`;
