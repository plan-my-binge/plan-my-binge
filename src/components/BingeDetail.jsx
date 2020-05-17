import styled from 'styled-components';
import React, {Component} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {BingeDetailHeader} from "./BingeDetailHeader.jsx";
import {BingeCalendar} from "./BingeCalendar.jsx";
import {minutesToDays, showRuntimeToUserRuntime} from "../utils/TimeUtils";
import {SeasonWiseStat} from "./SeasonWiseStat.jsx";
import {BingeStats} from "./BingeStats.jsx";
import Option from 'muicss/lib/react/option';
import Select from 'muicss/lib/react/select';
import {BingeUnit, Colors, isPhoneOrTablet, TrackingCategory} from "../utils/Constants";
import {InputStepper} from "./InputStepper.jsx";
import {BingeTime} from "./BingeTime";
import ReactGA from "react-ga";
import {ga} from "../utils/apiUtils";

const defaultDailyBingingTimeForUser = {
  hours: 2,
  episodes: 1
};

export class BingeDetail extends Component<{ detail: any }> {

  state = {
    userBingeTimeSetting: this.props.userBingeTime,
    possibleDailyBinging: {
      hours: 24,
      episodes: (24 * 60) / this.props.detail.perEpisodeRuntime
    }
  };

  render() {
    let {detail, bookmark} = this.props;

    let userRuntimeInMinutes = showRuntimeToUserRuntime(this.state.userBingeTimeSetting, detail);
    let userRuntimeInDays = minutesToDays(userRuntimeInMinutes);

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
          {userRuntimeInMinutes !== 0 && <BingeTimeAndCalenderContainer>
            <BingeTime runtime={userRuntimeInMinutes} title={detail.title}/>
            {this.getDailyBingeTime()}
            <BingeCalendar days={userRuntimeInDays} title={detail.title}/>
          </BingeTimeAndCalenderContainer>}
        </BingeTimeContainerCol>
        <Col>
          <SeasonWiseStat detail={detail} userBingeTime={this.state.userBingeTimeSetting}/>
        </Col>
      </BingeDetailContentRow>
    </Container>
  }

  getDailyBingeTime = () => {
    let maxLimit = this.state.userBingeTimeSetting.unit === BingeUnit.episodes ?
      this.state.possibleDailyBinging.episodes : this.state.possibleDailyBinging.hours;

    return <DailyBingTime>
      <TimeSliderHint>

        <InputStepper
          min={1}
          max={maxLimit}
          value={this.state.userBingeTimeSetting.value}
          onChange={this.onDailyBingingSettingValueChanged}
        />

        <SelectStyled
          onChange={this.onDailyBingingSettingUnitChanged}
          defaultValue={this.state.userBingeTimeSetting.unit}>
          <Option value={"hours"} label={"hours"}/>
          <Option value={"episodes"} label={"episodes"}/>
        </SelectStyled>

        a day
      </TimeSliderHint>
    </DailyBingTime>;
  };

  onDailyBingingSettingUnitChanged = (event) => {
    let unit = event.target.value;
    ReactGA.event(ga(TrackingCategory.DailyBingeTimeUnitChange,
      'Changed daily binge time unit with dropdown', unit.toString()));
    this.setState({
      userBingeTimeSetting: {
        unit: unit,
        value: unit === BingeUnit.episodes ? defaultDailyBingingTimeForUser.episodes :
          defaultDailyBingingTimeForUser.hours
      }
    }, () => this.props.setUserBingeTime(this.state.userBingeTimeSetting));

  };

  onDailyBingingSettingValueChanged = (value) => {
    ReactGA.event(ga(TrackingCategory.DailyBingeTimeChange, 'Changed daily binge time with input stepper', value.toString()));
    return this.setState({
      userBingeTimeSetting: {...this.state.userBingeTimeSetting, value: value}
    }, () => this.props.setUserBingeTime(this.state.userBingeTimeSetting));
  };
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

// const SelectStyled = styled(Select)`
//   margin-right: 5px;
//   margin-left: 5px;
//   margin-bottom: 10px;
// `;

const TimeSliderHint = styled.div`
  margin: auto;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DailyBingTime = styled.div`
  background-color: ${Colors.gray};
  text-align: center;
`;

const SelectStyled = styled(Select)`
    margin-right: 10px;
    padding-top: 10px;
    position: relative;
`;
