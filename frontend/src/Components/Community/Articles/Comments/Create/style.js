import { Row } from "react-bootstrap";
import styled from "styled-components";

export const CreateForm = styled(Row)`
  margin-top: 1rem;
  align-items: center;
`;

export const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  font-size: 0.8rem;
  padding: 0.5rem;
  background-color: lightgray;
  border: none;
  border-radius: 1rem;

  &:focus {
    outline: none;
    background-color: #88B04B;
  }
`;
