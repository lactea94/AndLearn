import { Col } from "react-bootstrap";
import styled from "styled-components";
import { MyButton } from "styles/Button";

export const Text = styled.div`
  text-align: left;
  font-size: 1rem;
  margin: 1rem 0;
`
export const Text1 = styled.div`
  text-align: center;
  font-size: 1rem;
  margin: 1rem;
`

export const AudioBox = styled(Col)`
  border: 1px solid gray;
  margin: 0.5rem;
  padding: 1rem;
  border-radius: 1rem;
`

export const AnswerBox = styled(Col)`
  border: 1px solid gray;
  margin: 0.5rem;
  padding: 1rem;
  border-radius: 1rem;
`

export const Button = styled(MyButton)`
  margin: 1rem;
`