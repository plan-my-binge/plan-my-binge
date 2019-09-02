import styled from 'styled-components';
import React, {Component} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {TimeSlider} from "./TimeSlider.jsx";
import {BingeDetailHeader} from "./BingeDetailHeader.jsx";
import {BingeTime} from "./BingeTime.jsx";
import {BingeCalendar} from "./BingeCalendar.jsx";
import {Colors} from "../utils/Constants";
import {minutesToDays} from "../utils/TimeUtils";
import {BingeStat} from "./BingeStats.jsx";

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

      <BingeDetailContent>
        <PosterContainer>
          <PosterPortrait src={detail.posterLandscape} className={"d-block d-md-none"}/>
          <Poster src={detail.posterPortrait} className={"d-none d-md-block"}/>
        </PosterContainer>

        <BingeTimeContainerCol>
          <TimeSlider selection={numberOfHours} slide={this.handleSlide}/>
          <BingeTime runtime={runtime}/>
          <BingeCalendar days={minutesToDays(detail.runtime, numberOfHours)} title={detail.title}/>
        </BingeTimeContainerCol>

        <Col>
          <BingeStat detail={detail}/>
        </Col>
      </BingeDetailContent>
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

const BingeDetailContent = styled(Row)`
  display: flex;
  flex-direction: row;
`;


const PosterContainer = styled(Col)`
  flex-grow: 0;
`;

const BingeTimeContainerCol = styled(Col)`
`;


const CenterDiv = styled.div`
  margin: auto;
  width: fit-content;
`;
