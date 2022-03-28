import { Form, Row } from "react-bootstrap";
import styled from "styled-components";

export const CreateForm = styled(Row)`
  margin-top: 1rem;
  align-items: center;
`;

export const Control = styled(Form.Control)`
  &:focus {
    box-shadow: none;
    border: solid 1px #88B04B
  }
`;
