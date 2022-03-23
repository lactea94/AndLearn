import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Table = styled(Container)`
  margin-bottom: 1rem;
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
  border-bottom: solid 1px lightgray;

  &:hover {
    background-color: lightgray;
  }
`;

export const TableNoticeRow = styled(TableRow)`
  background-color: #88B04B;

  &:hover {
    background-color: #ACC981;
  }
`;

export const Column = styled(Col)`

`;

export const DetailLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
`;