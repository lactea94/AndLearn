import { Container, Row } from "react-bootstrap";
import styled from "styled-components";


export const Contents = styled(Container)`

@media ( min-width: 820px ) {
  width: 80%;
}

@media ( min-width: 1280px ) {
  width: 60%;
}

`

export const Header = styled(Row)`
  padding-top: 5rem;
  font-family: BMEULJIRO;
  font-size: 5rem;
  align-items: center;
`

export const Image = styled.img`
  width: 100%;
`

export const Body = styled(Row)`
  margin-top: 10rem;
  justify-content: center;
  font-family: BMEULJIRO;
  font-size: 1.5rem;
`
export const Content = styled(Row)`
  margin: 2rem;
  justify-content: center;
  align-items: center;
`