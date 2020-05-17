import React from 'react';
import {Col} from "react-bootstrap";
import styled from 'styled-components';
import {BingePlanner} from "./BingePlanner.jsx";
import {BingePlannerWithRouter} from "./BingePlanner";
import {withTracker} from "./withTracker";

export function MainContent() {
  return (
      <div>
        <Content xs={12} lg={9}>
          <BingePlannerWithRouter/>
        </Content>
      </div>
  )
}

const Content = styled(Col)`
  float: right;
  margin-bottom: 100px;
  padding: 0;
`;
