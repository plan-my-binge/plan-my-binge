import React from 'react';
import {Col, Row} from "react-bootstrap";
import styled from 'styled-components';
import logo from "../images/logo.png";
import {BingePlanner} from "./BingePlanner.jsx";

export function MainContent(props: Props) {
  return (
      <div>
        <Content xs={12} lg={9}>
          <BingePlanner/>
        </Content>
      </div>
  )
}

const Content = styled(Col)`
  float: right;
  margin-bottom: 100px;
`;

type Props = {
  onNavChange: (navOption: string) => void,

};
