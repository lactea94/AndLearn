import styled from "styled-components";
import { Button } from "react-bootstrap";

export const MyButton = styled(Button)`
  background-color: #58C063;
  border: solid 1px #58C063;

  &:hover {
    background-color: white;
    color: #58C063;
    border: solid 1px #58C063;
  }

  &:focus {
    background-color: #58C063;
    border: solid 1px #58C063;
    color: white;
    box-shadow: none;
  }
`