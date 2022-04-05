import { Container, Row } from "react-bootstrap";
import styled from "styled-components";


export const Contents = styled(Container)`
  font-family: BMEULJIRO;
  font-size: 0.7rem;

  @media ( min-width: 375px ) {
    font-size: 1.0rem;
  }

  @media ( min-width: 768px ) {
    font-size: 1.3rem;
    width: 80%;
  }

  @media ( min-width: 1280px ) {
    font-size: 1.5rem;
    width: 65%;
  }
`
export const HeaderText = styled.div`
  font-size: 1.6rem;
  align-items: center;
  margin-top : 5rem;

  @media ( min-width: 375px ) {
    font-size: 2.2rem;
    margin-top : 3rem;
  }
  @media ( min-width: 768px ) {
    font-size: 2.8rem;
  }
  @media ( min-width: 1280px ) {
    font-size: 3.2rem;
  }
  &:hover {
    color: #58C063;
    transition-duration : 0.3s;
  }
`

export const Header = styled(Row)`
  padding-top: 2rem;
  align-items: center;

  @media ( min-width: 420px ) {
    padding-top : 10rem; 
  }
`

export const HeaderInfo = styled.div`
  font-size: 1.0rem;
  text-align: end;
  margin-top : 4rem;
  margin-right: 1rem;

  @media ( min-width: 420px ) {
    font-size: 1.1rem;
  }

  @media ( min-width: 820px ) {
    font-size: 1.3rem;
  }
  @media ( min-width: 1280px ) {
    font-size: 1.7rem;
  }

  &:hover {
    color: #FFDD74;
    transition-duration : 0.3s;
  }
`

export const Image = styled.img`
  width: 90%;
`

export const Body = styled(Row)`
  margin-top: 10rem;
  justify-content: center;
`

export const Content = styled(Row)`
  margin: 7rem 2rem;
  justify-content: center;
  align-items: center;
`

export const ServiceTitle = styled.h1`
  text-align: start;
  margin-bottom: 2rem;
  font-size: 3rem;
  
  @media ( min-width: 420px ) {
    font-size: 3.5rem;
  }

  @media ( min-width: 820px ) {
    font-size: 4rem;
  }
  @media ( min-width: 1280px ) {
    font-size: 5rem;
  }
`

export const ServiceText = styled.div`
  text-align: start;
  margin-bottom: 0.5rem;
  font-size: 1rem;

  @media ( min-width: 420px ) {
    font-size: 1.1rem;
  }

  @media ( min-width: 820px ) {
    font-size: 1.3rem;
  }

  @media ( min-width: 1280px ) {
    font-size: 1.7rem;
  }
`

export const ServiceEmphasizeText = styled.h1`
  text-align : start;
  margin: 7rem 3rem 0rem;
`

export const ContentTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  
  @media ( min-width: 420px ) {
    font-size: 2.1rem;
  }

  @media ( min-width: 820px ) {
    font-size: 2.3rem;
  }
  
  @media ( min-width: 1280px ) {
    font-size: 2.5rem;
  }
`
export const ContentText = styled.div`
  text-align: center;
  margin-bottom: 0.5rem;
  font-size : 0.9rem;

  @media ( min-width: 420px ) {
    font-size: 1.1rem;
  }

  @media ( min-width: 820px ) {
    font-size: 1.3rem;
  }
  
  @media ( min-width: 1280px ) {
    font-size: 1.6rem;
  }
`

export const ContentEmphasizeText = styled.div`
  text-align : center;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;

  @media ( min-width: 420px ) {
    font-size: 1.3rem;
  }

  @media ( min-width: 820px ) {
    font-size: 1.5rem;
  }
  
  @media ( min-width: 1280px ) {
    font-size: 1.9rem;
  }
`

export const RecommandEmphasizeText = styled.div`
  text-align : center;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;

  @media ( min-width: 420px ) {
    font-size: 1.7rem;
  }

  @media ( min-width: 820px ) {
    font-size: 1.9rem;
  }
  
  @media ( min-width: 1280px ) {
    font-size: 2.3rem;
  }
`