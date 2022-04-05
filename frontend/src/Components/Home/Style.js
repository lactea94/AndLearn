import { Container, Row } from "react-bootstrap";
import styled from "styled-components";


export const Contents = styled(Container)`
  font-family: BMEULJIRO;
  font-size: 0.7rem;

  @media ( min-width: 767px ) {
    font-size: 1.3rem;
    width: 80%;
  }
  @media ( min-width: 1199px ) {
    font-size: 1.5rem;
    width: 65%;
  }
  @media ( min-width: 1439px ) {
    font-size: 1.5rem;
    width: 65%;
  }
`
export const HeaderText = styled.div`
  align-items: center;
  font-size: 1.6rem;
  margin-top : 3rem;

  @media ( min-width: 767px ) {
    font-size: 2.8rem;
  }
  @media ( min-width: 1199px ) {
    font-size: 3.2rem;
  }
  @media ( min-width: 1439px ) {
    font-size: 3.6rem;
    margin-top : 2.5rem;
  }
  &:hover {
    color: #58C063;
    transition-duration : 0.3s;
  }
`

export const Header = styled(Row)`
  align-items: center;
  padding-top: 6rem;

  @media ( min-width: 767px ) {
    padding-top : 10rem; 
  }
  @media ( min-width: 1199px ) {
    padding-top : 3rem;
  }
  @media ( min-width: 1439px ) {
    padding-top : 2rem;
  }
`

export const Image = styled.img`
  width: 80%;
  margin-top: 3rem;
  margin-bottom: 2.5rem;

  @media( min-width : 767px ){
    width: 100%;
  }
  @media ( min-width: 1199px ) {
    width: 90%;
  }
`

export const HeaderInfo = styled.div`
  text-align: end;
  margin-top : 8rem;
  margin-right: 1rem;
  font-size: 1.0rem;

  @media ( min-width: 767px ) {
    font-size: 1.3rem;
    margin-top : 11rem;
    margin-right: 1rem;
  }
  @media ( min-width: 1199px ) {
    font-size: 1.7rem;
    margin-top : 3rem;
    margin-right: 1rem;
  }
  @media ( min-width: 1439px ) {
    font-size: 2.0rem;
    margin-top : 3rem;
    margin-right: 1rem;
  }

  &:hover {
    color: #FFDD74;
    transition-duration : 0.3s;
  }
`

export const Body = styled(Row)`
  margin-top: 10rem;
  justify-content: center;
`

export const Content = styled(Row)`
  margin: 7rem 2rem;
  justify-content: center;
  align-items: center;

  @media( min-width: 767px) {
    margin: 7rem 1rem;
  }

  @media ( min-width: 1199px ) {
    margin: 8rem 2rem;
  }
`

export const ServiceContent = styled(Row)`
  margin: 7rem 2rem;
  padding : 4rem 1rem;
  justify-content: center;
  align-items: center;

  @media( min-width: 767px) {
    margin: 10rem 2rem;
    padding: 5rem 0.5rem 8rem 0.5rem;
  }
  @media ( min-width: 1199px ) {
    margin: 10rem 2rem;
    padding: 5rem 0.5rem 8rem 0.5rem;
  }
  @media ( min-width: 1439px ) {
    margin: 8rem 2rem;
    padding: 4rem 0.5rem 10rem 0.5rem;
  }

`

export const ServiceTitle = styled.h1`
  text-align: start;
  margin-bottom: 2rem;
  font-size: 2.8rem;
  
  @media ( min-width: 767px ) {
    font-size: 4rem;
    margin-bottom: 2rem;
  }
  @media ( min-width: 1199px ) {
    font-size: 5rem;
  }
  @media ( min-width: 1439px ) {
    font-size: 6rem;
  }
`

export const ServiceText = styled.div`
  text-align: start;
  margin-bottom: 0.5rem;
  font-size: 1rem;

  @media ( min-width: 767px ) {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }
  @media ( min-width: 1199px ) {
    font-size: 1.35rem;
    margin-bottom: 0.5rem;
  }
  @media ( min-width: 1439px ) {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
`

export const EmphasizeText = styled.div`
  text-align : center;
  font-size : 1.5rem;
  padding-top : 1.3rem;
  padding-bottom : 2rem;

  @media ( min-width: 767px ) {
    font-size : 2.5rem;
    padding-top : 1.7rem;
    padding-bottom : 2.4rem;
  }
  @media ( min-width: 1199px ) {
    font-size : 2.6rem;
    padding-top : 1.3rem;
    padding-bottom : 2rem;
  }
  @media ( min-width: 1439px ) {
    font-size : 3rem;
    padding-top : 1.3rem;
    padding-bottom : 6rem;
  }
`

export const FirstStepContent = styled(Row)`
  justify-content: center;
  align-items: center;
  margin: 7rem 2rem;
  padding : 4rem 1rem;

  @media( min-width: 767px) {
    margin: 7rem 2rem;
    padding : 4rem 1rem;
  }
  @media ( min-width: 1199px ) {
    margin: 6rem 2rem;
    padding : 8rem 0rem;
  }
  @media ( min-width: 1439px ) {
    margin: 4rem 2rem;
    padding : 7rem 0rem;
  }
`

export const SecondStepContent = styled(Row)`
  justify-content: center;
  align-items: center;
  margin: 7rem 2rem;
  padding : 4rem 1rem;

  @media( min-width: 767px) {
    margin: 7rem 2rem;
    padding : 4rem 1rem;
  }
  @media ( min-width: 1199px ) {
    margin: 6rem 2rem;
    padding : 8rem 0rem;
  }
  @media ( min-width: 1439px ) {
    margin: 7rem 2rem;
    padding : 10rem 0rem;
  }
`

export const ContentTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.97rem;
  
  @media ( min-width: 767px ) {
    font-size: 3.4rem;
  }
  @media ( min-width: 1199px ) {
    font-size: 3.0rem;
  }
  @media ( min-width: 1439px ) {
    font-size: 2.6rem;
  }
`
export const ContentText = styled.div`
  text-align: center;
  margin-bottom: 0.5rem;
  font-size : 0.9rem;

  @media ( min-width: 767px ) {
    font-size: 1.6rem;
    margin-bottom: 0.6rem;
  }
  @media ( min-width: 1199px ) {
    font-size: 1.4rem;
  }
  @media ( min-width: 1439px ) {
    font-size: 1.7rem;
  }
`

export const ContentEmphasizeText = styled.div`
  text-align : center;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;

  @media ( min-width: 767px ) {
    font-size: 1.9rem;
  }
  @media ( min-width: 1199px ) {
    font-size: 1.7rem;
  }
  @media ( min-width: 1439px ) {
    font-size: 1.5em;
  }
`
export const Mascot = styled.img`
  width: 80%;
  margin-top: 3rem;
  margin-bottom: 2.5rem;

  @media( min-width : 767px ){
    width: 50%;
    padding-top: 3rem;
    padding-bottom: 4rem;
  }

  @media ( min-width: 1199px ) {
    width: 100%;
    padding-top: 3rem;
    padding-bottom: 4rem;
  }
`

export const ThirdStepContent = styled(Row)`
  justify-content: center;
  align-items: center;
  margin: 7rem 2rem;
  padding : 4rem 0rem;

  @media( min-width: 767px) {
    margin: 8rem 2rem;
    padding : 10rem 0rem;
  }
  @media ( min-width: 1199px ) {
    margin: 8rem 2rem;
    padding : 10rem 0rem;
  }
  @media ( min-width: 1199px ) {
    margin: 9rem 2rem;
    padding : 11rem 0rem;
  }
`

export const RecommandEmphasizeText = styled.div`
  text-align : center;
  margin-bottom: 0.5rem;
  font-size: 1.05rem;

  @media ( min-width: 767px ) {
    font-size: 1.8rem;
  }
  @media ( min-width: 1199px ) {
    font-size: 2.3rem;
  }
  @media ( min-width: 1199px ) {
    font-size: 2.7rem;
  }
`