import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom"
import styled from "styled-components";

const CalendarBox = styled.div`
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

const Calendar = styled.div`
  height: 110px;
  width: 820px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
`

const DailyBox = styled.div`
  width: 11px;
  height: 11px;
  background-color: gray;
  display: block;
  margin: 2px;
  border-radius: 2px;
  font-size: 9px;
`

export function ProfileStats() {
  const { userId } = useParams();

  const myStats = () => {
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const newDate = new Date();
    const nowDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate())
    const lastDate = new Date(newDate.getFullYear() - 1, newDate.getMonth(), newDate.getDate() - 1)
    const elapsedMSec = nowDate.getTime() - lastDate.getTime();
    const elapsedDay = elapsedMSec / 1000 / 60 / 60 / 24;
    const result = []

    for (let i = 0; i < elapsedDay + 1; i++) {
      if (i === 1 || i === 3 || i === 5) {
        const weekDate = new Date(newDate.getFullYear() - 1, newDate.getMonth(), newDate.getDate() - 1 + i)
        const weekNum = weekDate.getDay()
        result.push(
          <DailyBox style={{ position: 'relative'}}>
            <text style={{position: 'absolute', left: '-23px', top: '-2px', fontSize: '9px'}}>{week[weekNum]}</text>
          </DailyBox>
        )
      } else {
        result.push(<DailyBox></DailyBox>);
      }
    }

    return result;
  }

  return(
    <div>
      {userId} Stats
      <CalendarBox className="d-flex flex-column justify-content-end align-items-end overflow-hidden mx-auto pt-2">
        <Calendar className="d-flex flex-column flex-wrap overflow-hidden ps-4">
          {myStats()}
        </Calendar>
      </CalendarBox>
      <Row className="mx-auto" style={{ width: '90%'}}>
        <Col style={{ border: '1px solid gray', borderRight: 'none'}} >
          <p>총 학습량</p>
        </Col>
        <Col style={{ border: '1px solid gray'}} >
          연속 학습량
        </Col>
      </Row>
    </div>
  )
}