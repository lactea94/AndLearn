import { useState } from "react";
import { Col } from "react-bootstrap";
import { MyButton } from "styles/Button";
import { Input } from "styles/Input";
import { Select } from "styles/Select";

export function Search({ setSearchText, setSearchCategory, setPage }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("title");
  const handleClick = () => {
    setSearchText(text);
    setSearchCategory(category);
    setText("");
    setPage(1);
  }
  const handleKeyPress = e => {
    if(e.key === 'Enter') {
      handleClick();
    }
  }

  return (
    <Col xs={6}
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center"
      }}
    >
      <Select
        onChange={e => {
          setCategory(e.target.value);
        }}
      >
        <option value="title">제목</option>
        <option value="content">내용</option>
      </Select>
      <Input
        // style={{width: '5rem' }}
        type="text"
        value={text}
        onChange={e => {
          setText(e.target.value);
        }}
        onKeyPress={handleKeyPress}
      />
      <MyButton onClick={handleClick}>검색</MyButton>
    </Col>
  )
}
