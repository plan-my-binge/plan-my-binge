import '../style/shimmer.less'
import React from "react";
import styled, {keyframes, css} from 'styled-components';
import {range} from "ramda";
import Row from "react-bootstrap/Row";

export const ShowListShimmer = () => {
  return <ShimmerContainer>
    <Wrapper>
      <Row>
      {range(0, 8).map(i => <Card key={i}/>)}
      </Row>
    </Wrapper>
  </ShimmerContainer>
};

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const animated = css`
  animation : ${shimmer} 2s infinite linear;
  background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
  background-size: 1000px 100%;
`;

const ShimmerContainer = styled.div`
  margin: 20px;
`;

const Card = styled.div`
  ${animated};
  height: 12rem;
  width: 8rem;
  margin: 15px;
`;

const Wrapper = styled.div`
  width: 0;
  animation: fullView 0.5s forwards cubic-bezier(0.250, 0.460, 0.450, 0.940);
`;
