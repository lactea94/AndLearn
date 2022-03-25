import { Button } from "react-bootstrap";
import styled from "styled-components";

export const Text = styled.div`
  font-size: 17px;
  margin-bottom: 5px;
`

export const AnswerBox = styled.div`
  text-align: left;
  border: 1px solid gray;
  width: 100%;
  padding: 5px;
  margin-left: 12px;
  margin-right: 12px;
  border-radius: 6px;
`

export const AnswerButton = styled(Button)`
  width: 30%;
  font-size: 17px;
  margin-left: 12px;
  margin-bottom: 5px;
`