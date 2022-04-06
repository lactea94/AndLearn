import styled from "styled-components";
import { Col, Row } from "react-bootstrap";

export const CalendarBox = styled.div`
  box-sizing: border-box;
  border-top: 1px solid gray;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  width: 90%;
  @media ( min-width: 1280px ) {
    width: 80%;
  }
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
  width: 90%;
  @media ( min-width: 1280px ) {
    width: 80%;
  }
`

export const StatsText = styled.div`
  font-size: 15px;
  color: gray;
  margin-top: 15px;
  margin-bottom: 15px;
`

export const StatsNum = styled.div`
  font-size: 25px;
  color: black;
  margin-top: 1px;
  margint-bottom: 1px;
  font-weight: 600;
`

export const MonthText = styled.p`
  position: absolute;
  left: 0px;
  top: -15px;
  fontSize: 9px;
`

export const WeekText = styled.p`
  position: absolute;
  left: -23px;
  top: -2px;
  fontSize: 9px;
`

export const StatCol = styled(Col)`
  width: 84%;
  margin-top: 2rem;
  padding: 1rem 1rem;
  border: 1px solid gray;
  border-radius: 0.5rem;

  @media ( min-width: 768px ) {
    width: 87%;
  }

  @media ( min-width: 1200px ) {
    margin-left: 1rem;
    margin-right: 1rem;
    width: 38%;
  }
`