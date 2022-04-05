import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const UserImg = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 70%;
  overflow: hidden;
  object-fit: cover;
`

export const BtnAction = styled.button`
  border: none;
  background-color: #58C063;
  &:hover {
    background-color: #915450;
  }
`

export const UserId = styled(Col)`
  @media ( min-width: 768px ) {
    font-size: 1.5rem;
  }
  @media ( min-width: 1280px ) {
    font-size: 1.8rem;
  }
`

export const EditButton = styled(Link)`
  color: black;
  font-size: 29px;


  &:hover {
    color: #FFDD74;
  }
`

export const navLinkStyle = ({ isActive }) => (
  {
    textDecoration: "none",
    backgroundColor: isActive ? "#FFDD74" : "#58C063",
    color: "white",
    fontSize: "1rem",
    fontFamily: "Maru Buri",
    paddingRight: "0.8rem",
    paddingLeft: "0.8rem",
    paddingTop: "0.53rem",
    paddingBottom: "0.53rem",
    borderRadius: "0.31rem"
  }
)