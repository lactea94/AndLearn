import { Form } from "react-bootstrap";
import styled from "styled-components";

export const Control = styled(Form.Control)`
  &:focus {
    box-shadow: none;
    border: solid 1px #88B04B
  }
`;