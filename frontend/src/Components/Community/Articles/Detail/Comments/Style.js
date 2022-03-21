import { Button, Col, Container, Row } from "react-bootstrap";
import styled from "styled-components"

export const Comments = styled(Container)`
  padding: 1rem 0;
`

export const Header = styled(Row)`
  font-size: 0.8rem;
  padding: 0.4rem;
  margin-bottom: 0.5rem;
  background-color: #88B04B;
`

export const Comment = styled(Row)`
  border-bottom: solid 1px lightgray;
  text-align: start; 
  align-items: center;
  padding: 0.5rem;
`

export const User = styled(Col)`
  font-size: 0.8rem;
`

export const Body = styled(Col)`
  font-size: 0.9rem;
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

export const Created = styled(Col)`
  font-size: 0.8rem;
`
