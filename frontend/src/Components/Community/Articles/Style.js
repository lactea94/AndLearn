import { Link } from "react-router-dom"
import styled from "styled-components"

export const Table = styled.table`

`

export const THead = styled.thead`
`

export const TR = styled.tr`
border-bottom: solid 1px lightgray;
height: 2rem;

&:hover {
  background-color: lightgray;
}
`

export const TH = styled.th`
`

export const TD = styled.td`
`

export const TBody = styled.tbody`
`

export const DetailLink = styled(Link)`
  text-decoration: none;
`