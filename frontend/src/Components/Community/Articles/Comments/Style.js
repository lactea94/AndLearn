import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

export const Comments = styled(Container)`
  padding: 1rem 0;
`;

export const Header = styled(Row)`
  font-size: 0.8rem;
  padding: 0.4rem;
  margin-bottom: 0.5rem;
  background-color: #58C063;
  border-radius: 0.3rem;
`;

export const Comment = styled(Row)`
  text-align: start; 
  align-items: center;
  padding: 0.5rem;
`;

export const MyComment = styled(Row)`
  justify-content: end;
  text-align: start;
  align-items: center;
  padding: 0.5rem;
`;

export const CommentContent = styled.div`
  width: auto;
  min-width: 20rem;
  margin-left: 1rem;
  background-color: white;
  padding: 1rem;
  border-radius: 0.3rem;
`

export const MyCommentContent = styled.div`
  width: auto;
  min-width: 20rem;
  background-color: #FFDD74;
  padding: 1rem;
  border-radius: 0.3rem;
`

export const User = styled.div`
  font-size: 0.8rem;
`;

export const ImgBox = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 70%;
  overflow: hidden;
  padding: 0;
  margin: 0;
`
export const UserImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const Body = styled.div`
  font-size: 0.9rem;
`;

export const Created = styled.div`
  font-size: 0.8rem;
  text-align: end;
`;

export const Button = styled.button`
  font-size: 0.7rem;
  text-decoration: underline;
  color: red;
  background-color: inherit;
  border: none;

  &:hover {
    font-weight: bold;
    cursor: pointer;
  }
`