import React from 'react';
import {Col, Row} from "react-bootstrap";
import styled from 'styled-components';
import logo from "../images/logo.png";
import {BingePlanner} from "./BingePlanner.jsx";

export function MainContent(props: Props) {
  return (
      <div>
        <Logo xs={12} src={logo} className={"d-block d-lg-none"}/>
        <Content xs={12} lg={9}>
          <BingePlanner/>
        </Content>
      </div>
  )
}

const Content = styled(Col)`
  float: right;
  margin-bottom: 50px;
`;


const Logo = styled.img`
  max-width: 400px;
  width: 100%;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 20px;
  margin: auto;
  
`;


type Props = {
  onNavChange: (navOption: string) => void,

};
