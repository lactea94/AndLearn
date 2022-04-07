import { useState } from "react";
import { MyButton } from "styles/Button";
import { Input } from "styles/Input";
import { Select } from "styles/Select";
import * as S from "./Style";

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
    <S.Contents xs={12} md={8}>
      <Select
        onChange={e => {
          setCategory(e.target.value);
        }}
      >
        <option value="title">제목</option>
        <option value="nickname">작성자</option>
      </Select>
      <Input
        type="text"
        value={text}
        onChange={e => {
          setText(e.target.value);
        }}
        onKeyPress={handleKeyPress}
      />
      <MyButton onClick={handleClick}>검색</MyButton>
    </S.Contents>
  )
}
