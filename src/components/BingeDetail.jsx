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
import {Colors, isPhoneOrTablet} from "../utils/Constants";
import {InputStepper} from "./InputStepper.jsx";

import {BookmarkWeb} from "./BookmarkWeb";

export class BingeDetail extends Component<{ detail: any }> {

  constructor(props, context: any) {
    super(props, context);
    this.state = {
      numberOfBingingHoursPerDay: 2,
      dailyBingeSetting: {
        value: 2,
        unit: "hours"
      },
      possibleDailyBinging: {
        hours: 24,
        episodes: (24 * 60) / props.detail.perEpisodeRuntime
      }
    }
  }

  defaultDailyBinging = {
    hours: 2,
    episodes: 1
  };

  render() {
    let {detail, bookmark} = this.props;

    const {numberOfBingingHoursPerDay, numberOfEpisodesPerDay} = this.state;
    let runtimeInMinutes = this.state.dailyBingeSetting.unit === "hours" ?
      detail.runtime * (24 / (numberOfBingingHoursPerDay)) :
      this.numberOfEpisodesPerDayToMinutes(numberOfEpisodesPerDay);

    let numberOfDays = minutesToDays(runtimeInMinutes);

    let landscapePosterNotAvailableInPhoneButPortraitAvailable =
      isPhoneOrTablet && !detail.landscapePoster && detail.portraitPoster;

    let portraitPosterNotAvailableInWebButLandscapeAvailable =
      !isPhoneOrTablet && detail.landscapePoster && !detail.portraitPoster;

    return <Container>
      <BingeDetailHeader detail={detail}
                         pmbId={detail.pmbId}
                         bookmark={bookmark}
                         toggleBookmark={() => this.props.toggleBookmark(detail.pmbId)}/>

      <BingeDetailContentRow>
        <PosterContainerCol className={"col-sm-auto"}>
          {detail.landscapePoster &&
          <PosterLandscape src={detail.landscapePoster} className={"d-block d-md-none"}/>}

          {landscapePosterNotAvailableInPhoneButPortraitAvailable &&
          <PosterPortrait src={detail.portraitPoster}/>}

          {portraitPosterNotAvailableInWebButLandscapeAvailable &&
          <PosterLandscapeForWeb src={detail.landscapePoster}/>}

          {detail.portraitPoster &&
          <PosterPortrait src={detail.portraitPoster} className={"d-none d-md-block"}/>}

        </PosterContainerCol>

        <BingeTimeContainerCol>
          <BingeStats detail={detail}/>
          {runtimeInMinutes !== 0 && <BingeTimeAndCalenderContainer>
            <BingeTime runtime={runtimeInMinutes} title={detail.title}/>
            {this.getDailyBingeTime()}
            <BingeCalendar days={numberOfDays} title={detail.title}/>
          </BingeTimeAndCalenderContainer>}
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
  padding: 20px;
`;

const PosterPortrait = styled.img`
   width: 16rem;
   margin-left: 15px;
`;


const PosterLandscape = styled.img`
    width: 100%;
    width: -moz-available;
    width: -webkit-fill-available;
    width: fill-available;
    margin-right: 15px;
    margin-left: 15px;
`;


const PosterLandscapeForWeb = styled.img`
    width: 16rem;
    margin-right: 15px;
    margin-left: 15px;
`;

const BingeDetailContentRow = styled(Row)`
  display: flex;
  flex-direction: row;
`;


const PosterContainerCol = styled(Col)`
  padding-right: 0;
  padding-left: 0;
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

