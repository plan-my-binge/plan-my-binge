import styled from 'styled-components';
import React, {Component} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {TimeSlider} from "./TimeSlider.jsx";
import {BingeDetailHeader} from "./BingeDetailHeader.jsx";
import {BingeTime} from "./BingeTime.jsx";

export class BingeDetail extends Component<{ detail: any }> {

  constructor(props: P, context: any) {
    super(props, context);
    this.state = {
      numberOfHours: 24
    }
  }



  getSlider() {
    let handleSlide = (slidedBy) => this.setState({numberOfHours: slidedBy});
    const {numberOfHours} = this.state;

    return <>
      <Row ><TimeSliderHint> When you watch</TimeSliderHint> </Row>
      <Row><TimeSlider selection={numberOfHours} slide={handleSlide}/> </Row>
      <Row><TimeSliderHint>hours a day,</TimeSliderHint> </Row>
      <Row><TimeSliderHint>it would take</TimeSliderHint> </Row>
    </>;
  }

  render() {
    let {detail} = this.props;

    const {numberOfHours} = this.state;
    let runtime = detail.runtime * (24 / numberOfHours);
    return <Container>
      <BingeDetailHeader detail={detail}/>

      <BingeDetailContent>
        <PosterContainer>
          <Poster src={detail.posterPortrait}/>
        </PosterContainer>

        <BingeTimeContainer>
          {this.getSlider()}
          <BingeTime runtime={runtime}/>
          <Row><TimeSliderHint>to watch all the episodes of {detail.title}</TimeSliderHint> </Row>
          <Row>

          </Row>
        </BingeTimeContainer>

        <Col></Col>
      </BingeDetailContent>
    </Container>
  }

}


const Container = styled.div`
`;

const Poster = styled.img`
  height: 400px;
`;

const BingeDetailContent = styled(Row)`
  display: flex;
  flex-direction: row;
`;

const TimeSliderHint = styled.div`
  margin: auto;
  font-size: 0.9rem;
`;

const PosterContainer = styled(Col)`
  flex-grow: 0;
`;

const BingeTimeContainer = styled(Col)`
`;

