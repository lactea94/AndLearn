import { Button } from "react-bootstrap";
import styled from "styled-components";


export const MyButton = styled(Button)`
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
`;