import { Button, Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

export const Article = styled(Container)`
  margin-bottom: 2rem;
`

export const Header = styled(Row)`
  background-color: #88B04B;
  align-items: center;
  border-bottom: 0.1rem solid gray;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  padding: 0.5rem 0.2rem;
`

export const Title = styled(Col)`
  text-align: start;
  font-size: 1.3rem;
`

export const Created = styled(Col)`
  text-align: end;
  font-size: 0.8rem;
`

export const SubHeader = styled(Row)`
  align-items: center;
  border-bottom: 0.1rem solid lightgray;
  padding: 0.4rem 0;
`

export const User = styled(Col)`
  text-align: start;
  font-size: 0.8rem;
`

export const Delete = styled(Button)`
border: solid 1px red;
background-color: red;
border: solid 1px red;

&:focus {
  background-color: red;
  border: solid 1px red;
  box-shadow: none;
}

&:hover {
  background-color: red;
  border: solid 1px red;
}

&:active {
  box-shadow: none !important;
}
`

export const Body = styled(Row)`
  padding: 2rem 0.5rem;
  text-align: start;
  border-bottom: 0.1rem solid lightgray;
`