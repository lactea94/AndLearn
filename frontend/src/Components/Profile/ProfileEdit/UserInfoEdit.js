import { Form } from "react-bootstrap"
import { MyButton } from "styles/Button"
import { useState } from "react"
import { Link } from "react-router-dom"

export function UserInfoEdit() {
  const [userName, setUserName] = useState('')
  const [userNameError, setUserNameError] = useState(false)

  function onChangeUserName(e) {
    setUserNameError(false)
    setUserName(e.target.value)
  }

  function onSubmit(e) {
    // if (!validation()) return
    // const url = 'http://j6c201.p.ssafy.io/api/v1/users'
    // axios
    //   .post(url, { nickname: userName })
    //   .then((res) => {
    //     console.log(res.data)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
    console.log(userName)
  }

  return (
    <div className="row justify-content-center">
      <Form style={{ width: '50%' }}>
        <Form.Group className="mb-3">
          <Form.Control
            maxLength={20}
            placeholder="Nickname"
            value={userName}
            onChange={onChangeUserName}
          />
          {userNameError && (
            <div className="invalid-input">닉네임을 입력해주세요.</div>
          )}
        </Form.Group>
        <div className="d-grid gap-1 mb-3">
          <MyButton onClick={onSubmit}>회원 정보 수정</MyButton>
        </div>
        <div>
          <Link to={`password`}>
            <MyButton>비밀번호 수정</MyButton>
          </Link>
        </div>
      </Form>
    </div>
  )
}