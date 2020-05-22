import React from "react";
if (!process.env.SSR) require('../style/shimmer.less');
import styled, {keyframes, css} from 'styled-components';
import Row from "react-bootstrap/Row";
import range from "ramda/src/range";

export const ShowListShimmer = () => {
  return <ShimmerContainer>
    <Wrapper>
      <Row>
        {range(0, 8).map(i => <div key={i}>
            <Card/>
            <Title/>
          </div>
        )}
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
  margin: 15px 15px 10px;
  border-radius: 10px;
`;

const Title = styled.div`
  ${animated};
  height: 1rem;
  width: 8rem;
  margin: 0 15px 15px;
  border-radius: 10px;
`;

const Wrapper = styled.div`
  width: 0;
  animation: fullView 0.5s forwards cubic-bezier(0.250, 0.460, 0.450, 0.940);
`;
