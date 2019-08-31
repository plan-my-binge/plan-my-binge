import styled from 'styled-components';
import React, {Component} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Colors} from "../utils/Constants";
import {trim} from "ramda";
import {TimeSlider} from "./TimeSlider.jsx";

export class BingeDetail extends Component<{ detail: any }> {

  constructor(props: P, context: any) {
    super(props, context);
    this.state = {
      numberOfHours: 24
    }
  }

  render() {
    const {numberOfHours} = this.state;
    let {detail} = this.props;
    let year = detail.startYear + (detail.endYear ? `-${detail.endYear}` : "");
    let genre = detail.genre.split(',').map(trim).map(capitalizeFirstLetter).join(", ");
    let hint = <>{year} • imdb {detail.averageRating} • {genre}</>;

    let handleSlide = (slidedBy) => this.setState({numberOfHours: slidedBy});
    return <Container>
      <Row>
        <Col>
          <HeaderContainer>
            <Header>{detail.title}</Header>
            <HintContainer>
              <span>{hint}</span>
            </HintContainer>
          </HeaderContainer>

        </Col>
      </Row>
      <PosterAndStatContainer>
        <Col>
          <Poster src={detail.posterPortrait}/>
        </Col>
        <Col>

          <TimeSlider selection={numberOfHours} slide={handleSlide}/>

        </Col>
        <Col></Col>
      </PosterAndStatContainer>
    </Container>
  }
}

const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

const Container = styled.div`
`;

const Header = styled.h3`
  margin-bottom: 0;
`
const HintContainer = styled.div`
  color: ${Colors.darkGray};
  font-size: 1rem;
`

const Poster = styled.img`
  height: 400px;
`

const HeaderContainer = styled.div`
`

const PosterAndStatContainer = styled(Row)`
  display: flex;
  flex-direction: row;
`

