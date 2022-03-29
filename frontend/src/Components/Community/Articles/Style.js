import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Table = styled(Container)`
  margin-bottom: 1rem;
  background-color: white;
  border-radius: 1rem;
  width: 90%;
  background-color: #F8F8F8
`;

export const TableHead = styled(Row)`
  padding: 1rem 0;
`;

export const ColumnName = styled(Col)`

`;

export const TableRow = styled(Row)`
  font-size: 0.8rem;
  padding: 0.5rem 0;
  align-items: center;
  border-top: solid 1px #DFDFDF;

  &:hover {
    background-color: #DFDFDF;
  }
`;

export const TableNoticeRow = styled(TableRow)`
  background-color: #58C063;

  &:hover {
    background-color: #90D597;
  }
`;

export const Column = styled(Col)`

`;

export const DetailLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
`;