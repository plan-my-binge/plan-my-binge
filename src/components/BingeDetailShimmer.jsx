// import '../style/shimmer.less'
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const BingeDetailShimmer = () => {
  return <div className="shimmercard br">
    <div className="wrapper">
      <div className={"d-none d-md-block"}>
        <div className="title animate"/>
        <div className="subtitle animate"/>
      </div>
      <Row className={"animate moblie-title d-block d-md-none"}>
      </Row>

      <Row className={"d-block d-md-none"}>
        <Col className={"animate landscape"}/>
      </Row>
      <Row>
        <Col className={"animate portrait d-none d-md-block"}/>
        <Col>
          <Row className={"animate row_s"}/>
          <Row className={"animate row_s"}/>
        </Col>
        <Col>
          <Row className={"animate row_xs"}/>
          <Row className={"animate row_xs"}/>
          <Row className={"animate row_xs"}/>
          <Row className={"animate row_xs"}/>
        </Col>
      </Row>
    </div>
  </div>
};
