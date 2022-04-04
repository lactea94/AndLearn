import { Col } from "react-bootstrap";
import styled from "styled-components";


export const Contents = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;

  @media ( min-width: 768px ) {
    justify-content: start;
  }
`