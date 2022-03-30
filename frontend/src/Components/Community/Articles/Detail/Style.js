import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

export const Article = styled(Container)`
  width: 75%;
  margin-top: 3rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  background-color: #F8F8F8;
  padding: 2rem;
`;

export const Header = styled(Row)`
  display: inlnie;
  align-items: center;
  padding: 0.5rem 0.2rem;
`;

export const Title = styled(Col)`
  text-align: start;
  font-size: 1.3rem;
`;

export const Created = styled(Col)`
  text-align: end;
  font-size: 0.8rem;
`;

export const Updated = styled(Col)`
  text-align: end;
  font-size: 0.8rem;
`;

export const SubHeader = styled(Row)`
  align-items: center;
  background-color: #58C063;
  padding: 0.4rem 0;
  border-radius: 0.3rem;
`;

export const User = styled(Col)`
  text-align: start;
  font-size: 0.8rem;
`;

export const Body = styled(Row)`
  padding: 2rem 0.5rem;
  text-align: start;
`;