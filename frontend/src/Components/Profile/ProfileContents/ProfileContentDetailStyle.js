import { Button } from "react-bootstrap";
import styled from "styled-components";

export const Text = styled.div`
  text-align: left;
  font-size: 1rem;
  margin: 1rem 0;
`
export const Text1 = styled.div`
  text-align: center;
  font-size: 1rem;
  margin-bottom: 1rem;
`

export const AnswerBox = styled.div`
  text-align: left;
  border: 1px solid gray;
  width: 100%;
  padding: 5px;
  border-radius: 1rem;
`

export const AnswerButton = styled(Button)`
  width: 30%;
  font-size: 1rem;
  margin: 1rem;
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