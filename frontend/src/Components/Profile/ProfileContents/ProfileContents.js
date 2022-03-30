import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ProfileContent } from './ProfileContent';
import styled from "styled-components";
import { useState, useEffect } from "react"
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { MyButton } from 'styles/Button';

const Remote = styled.div`
  display: block; 
  position: fixed; 
  top: 300px; 
  left: 1300px; 
  z-index: 1000; 
  cursor: move;
  background-color: white;
  width: 10rem;
  height: 20rem;
  border: 1px solid black;
  border-radius: 6px;
  font-size: 15px;
`

const MyDatePicker = styled(ReactDatePicker)`
  width: 90%;
  border: 1px solid;
  border-radius: 3px;
`

export function ProfileContents() {
  const [contents, setContents] = useState([]);
  const [selectedContents, setSelectedContents] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isRemoteOn, setIsRemoteOn] = useState(true);

  function range(start, end) {
    var arr = [];
    var length = end - start; 
    for (var i = 0; i <= length; i++) { 
 
        arr[i] = start;
        start++;
    }
    return arr;
  }
  const years = range(1990, new Date().getFullYear());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // 전체 Contents 목록 불러오기 (현재 임시 값)
  useEffect(() => {
    setContents([
      {
        id: 1,
        imgUrl: 'http://placeimg.com/400/400/nature',
        created_at: '2021-03-23 11:14:00'
      },
      {
        id: 2,
        imgUrl: 'http://placeimg.com/400/400/nature',
        created_at: '2021-09-23 11:14:00'
      },
      {
        id: 3,
        imgUrl: 'http://placeimg.com/400/400/nature',
        created_at: '2021-09-24 11:14:00'
      },
      {
        id: 4,
        imgUrl: 'http://placeimg.com/400/400/nature',
        created_at: '2021-12-23 11:14:00'
      },
      {
        id: 5,
        imgUrl: 'http://placeimg.com/400/400/nature',
        created_at: '2022-01-23 11:14:00'
      },
      {
        id: 6,
        imgUrl: 'http://placeimg.com/400/400/nature',
        created_at: '2022-03-23 11:14:00'
      },
      {
        id: 7,
        imgUrl: 'http://placeimg.com/400/400/nature',
        created_at: '2022-03-24 11:14:00'
      },
      {
        id: 8,
        imgUrl: 'http://placeimg.com/400/400/nature',
        created_at: '2022-03-25 11:14:00'
      },
      {
        id: 9,
        imgUrl: 'http://placeimg.com/400/400/nature',
        created_at: '2022-03-26 11:14:00'
      },
      {
        id: 10,
        imgUrl: 'http://placeimg.com/400/400/nature',
        created_at: '2022-03-27 11:14:00'
      },
    ]);
  }, [])

  // 처음 contents 목록 받아올 때, 모든 contents 값을 default로 설정
  useEffect(() => {
    setSelectedContents(contents);
  }, [contents])

  // 버튼 클릭시 기간설정을 바탕으로 selectedContents 업데이트
  const clickSearchButton = () => {
    const startMSec = startDate.getTime();
    const endMSec = endDate.getTime();

    const result = contents.filter(content => 
      startMSec <= new Date(content.created_at).getTime() && new Date(content.created_at).getTime() <= endMSec
    )

    setSelectedContents(result);
  }

  // Remote 관련 함수
  let posX = 0;
  let posY = 0;  
  const dragStartHandler = e => {
    posX = e.clientX;
    posY = e.clientY;
  };
  const dragHandler = e => {
    e.target.style.left = `${e.target.offsetLeft + e.clientX - posX}px`;
    e.target.style.top = `${e.target.offsetTop + e.clientY - posY}px`;
    posX = e.clientX;
    posY = e.clientY;
  }
  const dragEndHandler = e => {
    e.target.style.left = `${e.target.offsetLeft + e.clientX - posX}px`;
    e.target.style.top = `${e.target.offsetTop + e.clientY - posY}px`;
  }
  const handleRemote = () => {
    setIsRemoteOn(!isRemoteOn)
  }

  return (
    <div>
      <Row>
        {selectedContents.map((content) => {
          return (
            <Col xs={4} key={content.id}>
              <ProfileContent imgUrl={content.imgUrl} contentId={content.id}/>
              {/* <ProfileContent content={content} /> */}
            </Col>
          )
        })}
      </Row>
      <Remote
        draggable 
        onDragStart={dragStartHandler} 
        onDrag={dragHandler} 
        onDragEnd={dragEndHandler}
        style={{ display: `${ isRemoteOn ? '' : 'none' }` }}
      >
        <div className='m-2'>
          기간 검색
        </div>
        <button className="btn-close" onClick={() => {handleRemote()}} style={{ position: 'absolute', left: '134px', top: '2px' }} />
        <MyDatePicker
          closeOnScroll={true}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div
              style={{
                margin: 10,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                {"<"}
              </button>
              <select
                value={date.getFullYear()}
                onChange={({ target: { value } }) => changeYear(value)}
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                value={months[date.getMonth()]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                {">"}
              </button>
            </div>
          )}
          selected={startDate} 
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
        />
        <div className='m-2'>~</div>
        <MyDatePicker
          closeOnScroll={true}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div
              style={{
                margin: 10,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                {"<"}
              </button>
              <select
                value={date.getFullYear()}
                onChange={({ target: { value } }) => changeYear(value)}
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                value={months[date.getMonth()]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                {">"}
              </button>
            </div>
          )}
          selected={endDate} 
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-d"
        />
        <MyButton color="#58C063" className='m-2 py-0' onClick={() => {clickSearchButton()}}>
          검색
        </MyButton>
      </Remote>
    </div>
  )
}