import { Container } from "react-bootstrap";
import styled from "styled-components";

export const Contents = styled(Container)`
  width: 80%;
  margin: 4.5rem auto;
  font-size: 0.8rem;

  @media ( min-width: 768px ) {
    width: 50%;
    margin: 7rem auto;
    font-size: 1rem;
  }

  @media ( min-width: 992px ) {
    width: 30%;
    margin: 7rem auto;
    font-size: 1rem;
  }
`