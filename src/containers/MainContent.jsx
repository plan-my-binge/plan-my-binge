import React from 'react';
import {Col, Row} from "react-bootstrap";
import styled from 'styled-components';
import logo from "../images/logo.png";
import {BingePlanner} from "./BingePlanner.jsx";

export function MainContent(props: Props) {
  return (
      <div>
        <Logo src={logo} className={"d-block d-lg-none"}/>
        <Container xs={12} lg={9}>
          <BingePlanner/>
        </Container>
      </div>
  )
}

const Container = styled(Col)`
  float: right;
`;


const Logo = styled.img`
  max-width: 400px;
  padding-right: 40px;
  padding-left: 40px;
  padding-top: 20px;
  margin: auto;
  
`;


type Props = {
  onNavChange: (navOption: string) => void,

};
