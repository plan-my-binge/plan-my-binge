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
import {BingeUnit, Classes, Colors, isPhoneOrTablet, TrackingCategory} from "../utils/Constants";
import {InputStepper} from "./InputStepper.jsx";
import {BingeTime} from "./BingeTime";
import ReactGA from "react-ga";
import {ga, getShowUri} from "../utils/apiUtils";
import {withRouter} from "react-router-dom";
import MetaTags from "react-meta-tags";

const defaultDailyBingingTimeForUser = {
  hours: 2,
  episodes: 1
};

const maxPossibleNumberOfEpisodesADay = (detail) => {
  let maxPossible = Math.floor((24 * 60) / detail.perEpisodeRuntime);
  return Math.min(detail.totalEpisodes, maxPossible);
};

const defaultTitle = "Plan my binge! - Binge clock: Find how long does it take to watch any TV show";

const showPageTitle = (showName) =>
  `${showName}  | Plan my binge | Find how long does it take to watch ${showName}`;

export class BingeDetail extends Component<{ detail: any }> {

  state = {
    userBingeTimeSetting: this.props.userBingeTime,
    possibleDailyBinging: {
      hours: 24,
      episodes: maxPossibleNumberOfEpisodesADay(this.props.detail)
    },
    pageTitle: ""
  };

  static getDerivedStateFromProps(props, state) {
    let pageTitle = defaultTitle;
    // if (props.location.pathname.startsWith("/binge") &&  && Boolean(document) ){
    //   pageTitle = showPageTitle(props.detail.primaryTitle)
    // }
    let maxPossibleEpisodesADay = maxPossibleNumberOfEpisodesADay(props.detail);
    let possibleDailyBinging = {
      hours: 24,
      episodes: maxPossibleEpisodesADay
    };

    if (state.userBingeTimeSetting.unit === BingeUnit.episodes &&
      state.userBingeTimeSetting.value > maxPossibleEpisodesADay) {
      return {
        pageTitle,
        userBingeTimeSetting: {
          unit: BingeUnit.episodes,
          value: maxPossibleEpisodesADay
        }, possibleDailyBinging
      }
    }

    return {
      pageTitle,
      userBingeTimeSetting: state.userBingeTimeSetting,
      possibleDailyBinging
    }
  }

  render() {
    let {detail, bookmark} = this.props;

    let userRuntimeInMinutes = showRuntimeToUserRuntime(this.state.userBingeTimeSetting, detail);
    let userRuntimeInDays = minutesToDays(userRuntimeInMinutes);

    let landscapePosterNotAvailableInPhoneButPortraitAvailable =
      isPhoneOrTablet() && !detail.landscapePoster && detail.portraitPoster;

    let portraitPosterNotAvailableInWebButLandscapeAvailable =
      !isPhoneOrTablet() && detail.landscapePoster && !detail.portraitPoster;

    return <Container>
      <MetaTags>
        <title>{this.state.pageTitle}</title>
        <meta property="og:title" content={this.state.pageTitle}/>
        <meta property="og:image" content={detail.landscapePoster || detail.portraitPoster}/>
        <meta property="og:url"
              content={"https://planmybinge.com/binge/" + getShowUri(detail.pmbId, detail.primaryTitle)}/>
      </MetaTags>
      <BingeDetailHeader detail={detail}
                         pmbId={detail.pmbId}
                         bookmark={bookmark}
                         toggleBookmark={() => this.props.toggleBookmark(detail.pmbId)}/>

      <BingeDetailContentRow>
        <PosterContainerCol className={"col-sm-auto"}>
          {detail.landscapePoster && !process.env.SSR &&
          <PosterLandscape src={detail.landscapePoster} className={Classes.showOnlyInMobile}/>}

          {landscapePosterNotAvailableInPhoneButPortraitAvailable && !process.env.SSR &&
          <PosterPortrait src={detail.portraitPoster} className={Classes.showOnlyInMobile}/>}

          {portraitPosterNotAvailableInWebButLandscapeAvailable && !process.env.SSR &&
          <PosterLandscapeForWeb src={detail.landscapePoster} className={Classes.showOnlyInWeb}/>}

          {detail.portraitPoster &&
          <PosterPortrait src={detail.portraitPoster} className={Classes.showOnlyInWeb}/>}

          <div className={Classes.showOnlyInWeb}>
            {this.getTagContainer(detail)}
          </div>
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
      <div className={Classes.showOnlyInMobile}>
        {this.getTagContainer(detail)}
      </div>
    </Container>
  }

  getTagContainer(detail) {
    return <TagContainer>
      Open in:
      <Tag href={"https://www.google.com/search?q=" + detail.primaryTitle} target={"_blank"}> Search</Tag>
      {detail.seriesid &&
      <Tag href={"https://www.imdb.com/title/" + detail.seriesid} target={"_blank"}> IMDB</Tag>}
    </TagContainer>;
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
          onChange={(e) => this.onDailyBingingSettingUnitChanged(e, maxLimit)}
          defaultValue={this.state.userBingeTimeSetting.unit}>
          <Option value={"hours"} label={"hours"}/>
          <Option value={"episodes"} label={"episodes"}/>
        </SelectStyled>

        a day
      </TimeSliderHint>
    </DailyBingTime>;
  };

  onDailyBingingSettingUnitChanged = (event, maxLimit) => {
    let unit = event.target.value;
    ReactGA.event(ga(TrackingCategory.DailyBingeTimeUnitChange,
      'Changed daily binge time unit with dropdown', unit.toString()));
    this.setState({
      userBingeTimeSetting: {
        unit: unit,
        value: Math.min(this.state.userBingeTimeSetting.value,
          unit === BingeUnit.episodes ? this.state.possibleDailyBinging.episodes :
            this.state.possibleDailyBinging.hours),
        value2: unit === BingeUnit.episodes ? defaultDailyBingingTimeForUser.episodes :
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

export const BingeDetailWithRouter = withRouter(BingeDetail);

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

const TagContainer = styled.div`
  margin-top: 20px;
  display: flex !important;
  align-items: center;
  justify-content: center; 
  color: ${Colors.darkGray};
   font-size: 0.8rem;
`;

const Tag = styled.a`
    cursor: pointer;
    padding: 4px;
    margin: 5px;
    border: 1px black ${Colors.gray};
    overflow: hidden;
    line-height: 0.7;
    background-color: ${Colors.gray};
      color: ${Colors.darkGray};
`;
