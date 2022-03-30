import { Form } from "react-bootstrap";
import styled from "styled-components";

export const Control = styled(Form.Control)`
  &:focus {
    box-shadow: none;
    border: solid 1px #88B04B
  }
`;

export const TextArea = styled.textarea`
  display: block;
  width: 100%;
  border: solid 1px lightgray;
  border-radius: 5px;

  &:focus {
    outline: none;
    border: solid 1px #88B04B;
  }
`;