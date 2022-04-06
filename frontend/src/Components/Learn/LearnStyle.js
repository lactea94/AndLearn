import styled from "styled-components"
import { Image, Col, Row } from "react-bootstrap"

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
  @media screen and (min-width: 768px) {
    width: 696px;
    height: 400px;
  }
  @media screen and (min-width: 1024px) {
    width: 100%;
    height: 500px;
  }
  width: 100%;
`

export const smallAlluCol = styled(Col)`
  @media screen and (min-width: 400px) {
    display: ;
  }
`

export const AlluImage = styled(Image)`
  @media screen and (max-width: 1024px) {
    margin-top: 1rem;
    width:150px;
    height:150px;
  }
  @media screen and (min-width: 1024px) {
    display: none;
  }
`

export const largeAlluImage = styled(Image)`
  @media screen and (min-width: 1024px) {
    width:200px;
    height:200px;
  }
`

export const onRecordingImage = styled(Image)`
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
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

export const myAudio = styled.audio`
  ${'' /* @media screen and (min-width: 1280px) {
    display: none;
  } */}
  width: 100%;
`

export const myTextarea = styled.textarea`
  @media screen and (min-width: 1280px) {
    display: none;
  }
  padding: 3px;
  resize: none;
`

export const largeTextarea = styled.textarea`
  @media screen and (max-width: 1024px) {
    display: none;
  }
  padding: 3px;
  resize: none;
`

export const largeWidthRow = styled(Row)`
  @media screen and (max-width: 1024px) {
    display: none;
  }
`