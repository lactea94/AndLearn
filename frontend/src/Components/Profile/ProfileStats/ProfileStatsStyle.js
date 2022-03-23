import styled from "styled-components";
import { Row } from "react-bootstrap";

export const CalendarBox = styled.div`
  box-sizing: border-box;
  border-top: 1px solid gray;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  @media screen and (min-width: 900px) {
    width: 850px;
  }
  width: 90%;
`

export const Calendar = styled.div`
  height: 130px;
  width: 820px;
  margin-left: 10px;
  margin-right: 10px;
`

export const DailyBox = styled.div`
  width: 11px;
  height: 11px;
  display: block;
  margin: 2px;
  border-radius: 2px;
  font-size: 9px;
`

export const StatsRow = styled(Row)`
  @media screen and (min-width: 900px) {
    width: 850px;
  }
  width: 90%;
`