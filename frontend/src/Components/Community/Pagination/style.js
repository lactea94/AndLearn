import { Button, ButtonGroup, Form } from "react-bootstrap";
import styled from "styled-components";

export const PageContainer = styled(ButtonGroup)`
  margin-top: 1rem;
  margin-left: 2rem;
  margin-bottom: 3rem;
`;

export const PageItem = styled(Button)`
  border: solid 1px #88B04B;
  background-color: ${props => props.current === true ? "#88B04B" : "white"};
  color:  ${props => props.current === true ? "white" : "#88B04B"};
  active: true;

  &:focus {
    background-color: #88B04B;
    border: solid 1px #88B04B;
    box-shadow: none;
  }

  &:hover {
    background-color: #88B04B;
    border: solid 1px #88B04B;
  }

  &:disabled {
    background-color: white;
    color: #88B04B;
    border: solid 1px #88B04B;
  }
  
  &:active {
    box-shadow: none !important;
  }
`;

export const PageLimit = styled(Form.Select)`
  border: solid 1px #88B04B !important;
  &:focus {
    box-shadow: none;
  }

  &:active {
    box-shadow: none !important;
  }
`;

export const FormControl = styled(Form.Control)`

  &:focus {
    border: solid 1px #88B04B;
    box-shadow: none;
  }
`;

export const PageButton = styled(Button)`
  background-color: #88B04B;
  border: solid 1px #88B04B;

  &:hover {
    background-color: white;
    color: #88B04B;
    border: solid 1px #88B04B;
  }

  &:focus {
    background-color: #88B04B;
    border: solid 1px #88B04B;
    color: white;
    box-shadow: none;
  }
  
  &:active {
    box-shadow: none !important;
  }
`;