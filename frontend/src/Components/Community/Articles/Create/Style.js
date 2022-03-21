import { Button, Form } from "react-bootstrap"
import styled from "styled-components"

export const ModalButton = styled(Button)`
  border: solid 1px #88B04B;
  background-color: ${props => props.color ? props.color : "#88B04B"};
  border: solid 1px ${props => props.color ? props.color : "#88B04B"};
  
  &:focus {
    background-color: ${props => props.color ? props.color : "#88B04B"};
    border: solid 1px ${props => props.color ? props.color : "#88B04B"};
    box-shadow: none;
  }

  &:hover {
    background-color: ${props => props.color ? props.color : "#88B04B"};
    border: solid 1px ${props => props.color ? props.color : "#88B04B"};
  }

  &:active {
    box-shadow: none !important;
  }
`

export const Control = styled(Form.Control)`
  &:focus {
    box-shadow: none;
    border: solid 1px #88B04B
  }
`

export const TextArea = styled.textarea`
  display: block;
  width: 100%;
  border: solid 1px lightgray;
  border-radius: 5px;

  &:focus {
    outline: none;
    border: solid 1px #88B04B;
  }
`