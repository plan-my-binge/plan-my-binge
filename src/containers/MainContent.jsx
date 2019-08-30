import React from 'react';
import {Col, Row} from "react-bootstrap";
import styled from 'styled-components';

export function MainContent(props: Props) {
  return (
      <div>
        <Container xs={12} lg={9}>
          <p>
            Sed semper, metus non fringilla euismod, tortor elit dignissim dui, in lobortis nibh lorem ut mauris. Cras
            hendrerit quam pharetra nibh feugiat, ac sollicitudin augue porta. Vestibulum mollis sem urna, convallis
            vulputate ipsum tempor sed. Pellentesque volutpat id purus eget mattis. Etiam scelerisque risus ut erat
          </p>

          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
        </Container>
      </div>
  )
}

const Container = styled(Col)`
  float: right;
`;

type Props = {
  onNavChange: (navOption: string) => void,

};
