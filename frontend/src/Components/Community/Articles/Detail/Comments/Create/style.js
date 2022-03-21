import { Button, Form, Row } from "react-bootstrap"
import styled from "styled-components"

export const CreateForm = styled(Row)`
  margin-top: 1rem;
  align-items: center;
`

export const Control = styled(Form.Control)`
  &:focus {
    box-shadow: none;
    border: solid 1px #88B04B
  }
`

export const Create = styled(Button)`
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