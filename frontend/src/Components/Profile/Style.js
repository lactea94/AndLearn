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
export const navLinkStyle = ({ isActive }) => (
  {
    textDecoration: "none",
    backgroundColor: isActive ? "#FFDD74" : "#58C063",
    color: "white",
    fontSize: "1rem",
    fontFamily: "Maru Buri",
    "padding-right": "0.8rem",
    "padding-left": "0.8rem",
    "padding-top": "0.53rem",
    "padding-bottom": "0.53rem",
    "border-radius": "0.31rem"
  }
)