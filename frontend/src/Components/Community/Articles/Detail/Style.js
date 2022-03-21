import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

export const Article = styled(Container)`
  width: 80%;
  margin-bottom: 5rem;
`

export const Header = styled(Row)`
  background-color: #88B04B;
  align-items: center;
  border-top: 0.1rem solid gray;
  border-bottom: 0.1rem solid gray;
`

export const Title = styled(Col)`
  text-align: start;
  font-size: 1.3rem;
`

export const Created = styled(Col)`
  text-align: end;
  font-size: 0.8rem;
`

export const User = styled(Col)`
  text-align: start;
  font-size: 0.8rem;
`

export const CommentCount = styled(Col)`
  text-align: end;
  font-size: 0.8rem;
`

export const SubHeader = styled(Row)`
  align-items: center;
  border-bottom: 0.1rem solid lightgray;
`

export const Body = styled(Row)`
  padding: 1rem 0.5rem;
  text-align: start;
  border-bottom: 0.1rem solid lightgray;
`