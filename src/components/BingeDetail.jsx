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
    pageTitle: "",
    setBingeUnitTimeout: null
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

    console.log(navigator.platform)
    let isIOS = /iPad|iPhone|iPod/.test(navigator.platform)
        || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

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
      <div className={Classes.showInSmallerScreen}>
        {this.getTagContainer(detail)}
        <a
            style={{display: "flex", justifyContent: "center", alignItems: "center"}}
            target={"_blank"}
            href='https://play.google.com/store/apps/details?id=com.planmybinge&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>

          <img alt='Get it on Google Play'
               src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'
               style={{margin: "auto"}}
               width={"220"}
               height={"auto"}
          />
        </a>

        <IosBanner>Coming soon for iOS</IosBanner>
        {isIOS && <PWABanner>
          <div>Install as Web-App</div>
          <img src={"https://planmybinge.com/ios_pwa_crop.jpg"} width={"100%"}/>

        </PWABanner>}




      </div>
    </Container>
  }

  getTagContainer(detail) {
    return <TagContainer>
      Open {detail.primaryTitle} in:
      <Tag href={"https://www.google.com/search?q=" + detail.primaryTitle}
           target={"_blank"}
           onClick={() => {
             ReactGA.event(ga(TrackingCategory.OpenIn,
               'Open series in ', 'Search'));
           }}>
        Google</Tag>
      {detail.seriesid &&
      <Tag href={"https://www.imdb.com/title/" + detail.seriesid}
           target={"_blank"}
           onClick={() => {
             ReactGA.event(ga(TrackingCategory.OpenIn,
               'Open series in ', 'IMDB'));
           }}> IMDB</Tag>}
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
    let value = Math.min(this.state.userBingeTimeSetting.value,
        unit === BingeUnit.episodes ? this.state.possibleDailyBinging.episodes :
            this.state.possibleDailyBinging.hours);
    this.setState({
      userBingeTimeSetting: {
        unit: unit,
        value: value,
      }
    }, () => this.props.setUserBingeTime(this.state.userBingeTimeSetting));

    this.sendDailyBingeTimeChangeGAevent(value.toString(), unit);

  };

  sendDailyBingeTimeChangeGAevent(value, unit) {
    if (this.state.setBingeUnitTimeout != null) {
      clearTimeout(this.state.setBingeUnitTimeout);
    }

    let setBingeUnitTimeout = setTimeout(() => {
      ReactGA.event(
          ga(TrackingCategory.DailyBingeTimeChange, 'Changed daily binge time',
              `${value} ${unit}`));
    }, 5000);

    this.setState({setBingeUnitTimeout});
  }

  onDailyBingingSettingValueChanged = (value) => {

    this.sendDailyBingeTimeChangeGAevent(value.toString(), this.state.userBingeTimeSetting.unit);

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
  color: ${Colors.black};
   font-size: 0.8rem;
`;

const Tag = styled.a`
    cursor: pointer;
    padding: 6px;
    margin: 5px;
    border: 1px black ${Colors.darkerGray};
    overflow: hidden;
    line-height: 0.7;
    background-color: ${Colors.darkerGray};
      color: ${Colors.white};
`;

const IosBanner = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${Colors.gray};
  padding: 10px;
  font-weight: bold;
    `;

const PWABanner = styled.div`

  margin-top: 5px;
  text-align: center;
  background-color: ${Colors.gray};
  color: ${Colors.darkerGray};
  padding: 10px;
  
  div {
    font-size: 1.2rem;
    font-weight: bold;
    
  }
`;
