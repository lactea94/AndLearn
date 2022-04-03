import { Container, Row } from "react-bootstrap";
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
  margin-left: 1rem;
  background-color: white;
  padding: 1rem;
  border-radius: 0.3rem;

  @media ( min-width: 768px ) {
    width: auto;
    min-width: 15rem;
  }

  @media ( min-width: 1280px ) {
    width: auto;
    min-width: 20rem;
  }
`

export const MyCommentContent = styled.div`
  width: auto;
  background-color: #FFDD74;
  padding: 1rem;
  border-radius: 0.3rem;

  @media ( min-width: 768px ) {
    width: auto;
    min-width: 15rem;
  }

  @media ( min-width: 1280px ) {
    width: auto;
    min-width: 20rem;
  }
`

export const User = styled.div`
  font-size: 0.5rem;
  font-weight: bold;

  @media ( min-width: 768px ) {
    font-size: 0.8rem;
  }
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
  font-size: 0.5rem;
  white-space: pre-wrap;

  @media ( min-width: 768px ) {
    font-size: 0.9rem;
  }
`;

export const Created = styled.div`
  font-size: 0.5rem;
  text-align: end;

  @media ( min-width: 768px ) {
    font-size: 0.8rem;
  }
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

export const CreateForm = styled(Row)`
  margin-top: 5rem;
  align-items: center;
`;

export const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  font-size: 0.8rem;
  padding: 0.5rem;
  margin: 0;
  border: none;
  border-radius: 1rem;

  &:focus {
    outline: none;
    background-color: #FFDD74;
  }
`;

export const DeleteButton = styled.button`
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