import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {HomePageError} from "./HomePageError.jsx";
import {BingeDetailShimmer} from "./BingeDetailShimmer.jsx";
import styled from 'styled-components';
import {BingeUnit, Colors} from "../utils/Constants";
import {PopularShows} from "./PopularShows";
import BingeDetailContainer from "../containers/BingeDetailContainer";
import {AppHeader} from "./AppHeader";
import {showRuntimeToUserRuntime, toDaysHoursAndMinutes} from "../utils/TimeUtils";

class BingeDetailPage extends Component<{ popularShows: any }> {

  state = {
    bingeDetail: null,
    showError: false,
    showLoader: !(Boolean(this.props.location.data))
  };

  componentDidMount() {
    if (!this.props.location.data) {
      this.props.getShow(this.props.match.params.pmbId.split('-')[0]);
    }

    if (this.props.popularShows.length === 0 && !process.env.SSR) {
      this.props.getPopularShows();
    }
  }

  goBack() {
    if (this.props.location.data) {
      this.props.history.goBack()
    } else this.props.history.push("/")
  }

  render() {

    let {popularShows, showError, showLoader, shows, match, location} = this.props;
    let bingeDetail = location.data || shows.find(x => x.pmbId == match.params.pmbId.split('-')[0]);

    if (!bingeDetail) return <BingeDetailShimmer/>
    let userRuntimeInMinutes = showRuntimeToUserRuntime({unit: BingeUnit.episodes, value: 2}, bingeDetail);
    let bingeTime = toDaysHoursAndMinutes(userRuntimeInMinutes);
    let showHours = bingeTime.hours !== null /*&& bingeTime.hours !== 0*/;
    let showDays = bingeTime.days !== null && bingeTime.days !== 0;

    let summary = `It will take ${showDays ? bingeTime.days + " days, " : ""} ${showHours ? bingeTime.hours + " hours, " : ""} ${bingeTime.minutes} minutes to watch all episodes of ${bingeDetail.primaryTitle}, when you watch 2 episodes per day. Set no. of episodes/hours you watch per day and get customised binge time.`
    return <Container>
      {process.env.SSR && <h2>{summary}</h2>}
      <AppHeader history={this.props.history}/>
      <Content>
        {bingeDetail && <BingeDetailContainer detail={bingeDetail}/>}
        {showError && <HomePageError/>}
        {showLoader && <BingeDetailShimmer/>}
        {bingeDetail && popularShows.length !== 0 && !process.env.SSR && <PopularShows shows={popularShows}/>}
      </Content>
    </Container>
  }
}

export const BingDetailPageWithRouter = withRouter(BingeDetailPage);

const Header = styled.div`
  border-bottom: 1px solid ${Colors.gray};
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  position: fixed;
  top: 0;
  z-index: 999;
  background-color: ${Colors.white};
`;

const BackLink = styled.a`
  color: ${Colors.black};
  font-size: 1.5rem;
  &:hover {
    color: ${Colors.darkGray};
    text-decoration: none;
    border-radius: 10px;
  }
`;

const Content = styled.div`
`;

const Container = styled.div`
  height: 100%;
`;
