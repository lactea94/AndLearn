import { Form } from "react-bootstrap";
import styled from "styled-components";

export const Control = styled(Form.Control)`
  &:focus {
    box-shadow: none;
    border: solid 1px #58C063
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
