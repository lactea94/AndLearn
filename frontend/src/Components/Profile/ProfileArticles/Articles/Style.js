import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Table = styled(Container)`
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: white;
  border-radius: 1rem;
  width: 90%;
  background-color: #f8f8f8;
  overflow: hidden;
`

export const TableHead = styled(Row)`
  padding: 1rem 0;
  font-size: 0.3rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`

export const ColumnName = styled(Col)``

export const TableRow = styled(Row)`
  font-size: 0.2rem;
  padding: 0.5rem 0;
  align-items: center;
  border-top: solid 1px lightgray;

  &:hover {
    background-color: lightgray;
  }

  @media (min-width: 768px) {
    font-size: 0.8rem;
  }
`

export const TableNoticeRow = styled(TableRow)`
  background-color: #58c063;

  &:hover {
    background-color: #90d597;
  }
`

export const Column = styled(Col)``

export const DetailLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: bold;

  &:hover {
    color: gray;
  }
`;
