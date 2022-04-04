import { Container, Row } from "react-bootstrap";
import styled from "styled-components";


export const Contents = styled(Container)`
  font-family: BMEULJIRO;
  font-size: 0.7rem;

  @media ( min-width: 820px ) {
    font-size: 1.3rem;
    width: 80%;
  }

  @media ( min-width: 1280px ) {
    font-size: 1.5rem;
    width: 60%;
  }
`

export const Header = styled(Row)`
  padding-top: 5rem;
  align-items: center;
`

export const Image = styled.img`
  width: 100%;
`

export const Body = styled(Row)`
  margin-top: 10rem;
  justify-content: center;
`
export const Content = styled(Row)`
  margin: 2rem;
  justify-content: center;
  align-items: center;
`