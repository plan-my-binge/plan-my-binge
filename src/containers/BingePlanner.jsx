import React from 'react';
import styled from 'styled-components';

export function BingePlanner(props: Props) {
  return (
      <Container>
        <HeaderMessage>
          How long will it take to watch all episodes of a TV Show?
        </HeaderMessage>
      </Container>
  )
}


const Container = styled.div`
  padding: 20px;
`;

const HeaderMessage = styled.h4`
    font-weight: 600;
`;
