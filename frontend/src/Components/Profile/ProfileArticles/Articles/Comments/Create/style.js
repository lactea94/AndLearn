import { Row } from "react-bootstrap";
import styled from "styled-components";

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
