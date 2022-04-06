import styled from "styled-components"
import { Image, Col } from "react-bootstrap"

export const MyImage = styled(Image)`
  margin-top: 2rem;

  @media screen and (min-width: 900px) {
    width: 850px;
    height: 500px;
  }
  width: 90%;
`

export const MyImage2 = styled(Image)`
  margin-top: 2rem;
  ${'' /* @media screen and (min-width: 900px) {
    width: 500px;
    height: 350px;
  } */}
  width: 100%;
`

export const smallAlluCol = styled(Col)`
  @media screen and (min-width: 400px) {
    display: none;
  }
`

export const AlluImage = styled(Image)`
  margin-top: 1rem;
  width:200px;
  height:200px;

`
export const Text1 = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-weight:bold;
`

export const Text2 = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-weight:bold;
`

export const Text3 = styled.div`
  margin-top: 30px;
  font-weight: bold;
`

export const AIBox = styled.div`
  margin-top: 1rem;
  text-align: center;
  border: 1px solid gray;
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
`

export const smallAudio = styled.audio`
  @media screen and (min-width: 1280px) {
    display: none;
  }
  width: 100%;
`