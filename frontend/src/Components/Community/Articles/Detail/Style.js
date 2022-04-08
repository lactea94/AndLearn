import { Col, Container, Form, Row } from "react-bootstrap";
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
  font-size: 1rem;

  @media ( min-width: 768px ) {
    font-size: 1.3rem;
  }
`;

export const Created = styled(Col)`
  text-align: center;
  font-size: 0.5rem;
  padding: 0.5rem;

  @media ( min-width: 768px ) {
    font-size: 0.8rem;
    text-align: end;
    padding: 0;
  }
`;

export const Updated = styled(Col)`
  text-align: center;
  font-size: 0.5rem;
  padding: 0.5rem;

  @media ( min-width: 768px ) {
    font-size: 0.8rem;
    text-align: end;
    padding: 0;
  }
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
  padding: 0;
`;

export const Body = styled(Row)`
  padding: 2rem 0.5rem;
  text-align: start;
  white-space: pre-wrap;
`;

export const Control = styled(Form.Control)`
  &:focus {
    box-shadow: none;
    border: solid 1px #88B04B
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  font-size: 0.8rem;
  padding: 0.5rem;

  border: solid 1px #58C063;
  border-radius: 0.3rem;

  &:focus {
    border: solid 1px #58C063;
    outline: solid 1px #58C063;
  }
`;

export const ImgBox = styled(Col)`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 70%;
  overflow: hidden;
  padding: 0;
  margin: 0.3rem;
`

export const UserImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;