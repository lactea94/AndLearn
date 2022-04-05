import { Button } from "react-bootstrap";
import styled from "styled-components";

export const Text = styled.div`
  text-align: left;
  font-size: 22px;
  margin-bottom: 15px;
`
export const Text1 = styled.div`
  text-align: center;
  font-size: 22px;
  margin-bottom: 15px;
`

export const AnswerBox = styled.div`
  text-align: left;
  border: 1px solid gray;
  width: 100%;
  padding: 5px;
  margin-left: 12px;
  margin-right: 24px;
  border-radius: 6px;
`

export const AnswerButton = styled(Button)`
  width: 30%;
  font-size: 17px;
  margin-left: 12px;
  margin-bottom: 5px;

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