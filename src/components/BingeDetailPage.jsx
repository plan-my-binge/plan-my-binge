import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {BingeDetail} from "./BingeDetail.jsx";
import {HomePageError} from "./HomePageError.jsx";
import {BingeDetailShimmer} from "./BingeDetailShimmer.jsx";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styled from 'styled-components';
import {Colors} from "../utils/Constants";
import {PopularShows} from "./PopularShows";

class BingeDetailPage extends Component<{ popularShows: any }> {

  state = {
    bingeDetail: null,
    showError: false,
    showLoader: !(Boolean(this.props.location.data))
  };

  componentDidMount() {
    if (!this.props.location.data) {
      this.props.getShow(this.props.match.params.pmbId);
    }

    if (this.props.popularShows.length === 0) {
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
    let bingeDetail = location.data || shows.find(x => x.pmbId == match.params.pmbId);

    return <Container>
      <Header>
        <BackLink onClick={() => this.goBack()}>
          <ArrowBackIcon fontSize={"large"}/> Back
        </BackLink>
      </Header>
      <Content>
        {bingeDetail && <BingeDetail detail={bingeDetail}/>}
        {showError && <HomePageError/>}
        {showLoader && <BingeDetailShimmer/>}
        {bingeDetail && popularShows.length !== 0 && <PopularShows shows={popularShows}/>}
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
  margin-top: 50px;
`;

const Container = styled.div`
  height: 100%;
`;
