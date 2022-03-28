import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

export const Comments = styled(Container)`
  padding: 1rem 0;
`;

export const Header = styled(Row)`
  font-size: 0.8rem;
  padding: 0.4rem;
  margin-bottom: 0.5rem;
  background-color: #88B04B;
`;

export const Comment = styled(Row)`
  border-bottom: solid 1px lightgray;
  text-align: start; 
  align-items: center;
  padding: 0.5rem;
`;

export const User = styled(Col)`
  font-size: 0.8rem;
`;

export const Body = styled(Col)`
  font-size: 0.9rem;
`;

export const Created = styled(Col)`
  font-size: 0.8rem;
`;

export const Button = styled.div`
  margin: 0;
  padding: 0;
  font-size: 0.7rem;
  text-align: center;
  text-decoration: underline;
  color: red;

  &:hover {
    font-weight: bold;
    cursor: pointer;
  }
`