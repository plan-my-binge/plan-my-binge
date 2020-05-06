import styled from 'styled-components';
import React, {Component} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {BingeDetailHeader} from "./BingeDetailHeader.jsx";
import {BingeTime} from "./BingeTime.jsx";
import {BingeCalendar} from "./BingeCalendar.jsx";
import {minutesToDays} from "../utils/TimeUtils";
import {SeasonWiseStat} from "./SeasonWiseStat.jsx";
import {BingeStat2} from "./BingeStat2.jsx";

export class BingeDetail extends Component<{ detail: any }> {

  constructor(props: P, context: any) {
    super(props, context);
    this.state = {
      numberOfHours: 24
    }
  }

  handleSlide = (slidedBy) => this.setState({numberOfHours: slidedBy});

  render() {
    let {detail} = this.props;

    const {numberOfHours} = this.state;
    let runtime = detail.runtime * (24 / numberOfHours);
    return <Container>
      <BingeDetailHeader detail={detail}/>

        <BingeDetailContentRow>
          <PosterContainerCol className={"col-sm-auto"}>
            <PosterPortrait src={detail.posterLandscape} className={"d-block d-md-none"}/>
            <Poster src={detail.posterPortrait} className={"d-none d-md-block"}/>
          </PosterContainerCol>

          <BingeTimeContainerCol>
            <BingeStat2 detail={detail}/>

            <BingeTimeAndCalenderContainer>

            <BingeTime runtime={runtime} title={detail.title}/>
            <BingeCalendar days={minutesToDays(detail.runtime, numberOfHours)} title={detail.title}/>
            </BingeTimeAndCalenderContainer>
          </BingeTimeContainerCol>

          <Col>
            <SeasonWiseStat detail={detail}/>
          </Col>
        </BingeDetailContentRow>
    </Container>
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
`
