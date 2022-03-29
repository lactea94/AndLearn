import { Button } from "react-bootstrap";
import styled from "styled-components";


export const MyButton = styled(Button)`
  border: solid 1px #88B04B;
  background-color: ${props => props.color ? props.color : "#ffdd74"};
  border: solid 1px ${props => props.color ? props.color : "#ffdd74"};
  
  &:focus {
    background-color: ${props => props.color ? props.color : "#ffdd74"};
    border: solid 1px ${props => props.color ? props.color : "#ffdd74"};
    box-shadow: none;
  }

  &:hover {
    background-color: ${props => props.color ? props.color : "#ffdd74"};
    border: solid 1px ${props => props.color ? props.color : "#ffdd74"};
  }

  &:active {
    box-shadow: none !important;
  }
`;