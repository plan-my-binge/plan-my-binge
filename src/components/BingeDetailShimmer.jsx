import '../style/shimmer.less'
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const BingeDetailShimmer = () => {
  return <div className="shimmercard br">
    <div className="wrapper">
      <div className="title animate"/>
      <div className="subtitle animate"/>
      <Row>
        <Col className={"animate column"}/>
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
