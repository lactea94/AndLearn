import { useState } from "react";
import { Col } from "react-bootstrap";
import { MyButton } from "styles/Button";
import { Input } from "styles/Input";
import { Select } from "styles/Select";

export function Search({ setSearchText, setSearchCategory, setPage }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("title");

  return (
    <Col xs={6}>
      <Select
        onChange={e => {
          e.preventDefault();
          setCategory(e.target.value);
        }}
      >
        <option value="title">제목</option>
        <option value="body">내용</option>
      </Select>
      <Input
        type="text"
        value={text}
        onChange={(e) => {
          e.preventDefault();
          setText(e.target.value);
        }}
      />
      <MyButton
        onClick={() => {
          setSearchText(text);
          setSearchCategory(category);
          setText("");
          setPage(1);
        }}
      >
        검색
      </MyButton>
    </Col>
  )
}
