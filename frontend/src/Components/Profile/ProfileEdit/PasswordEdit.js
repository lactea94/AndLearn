import { useState } from "react"
import { Form } from "react-bootstrap"
import { MyButton } from "styles/Button";
import { apiInstance } from "api";
import { useNavigate } from "react-router-dom";
import { Input } from "styles/Input";

export function PasswordEdit() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const navigate = useNavigate();
  const api = apiInstance();

  function onChangePassword(e) {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/
    if (!e.target.value || passwordRegex.test(e.target.value))
      setPasswordError(false)
    else setPasswordError(true)

    if (!confirmPassword || e.target.value === confirmPassword)
      setConfirmPasswordError(false)
    else setConfirmPasswordError(true)
    setPassword(e.target.value)
  }

  function onChangeConfirmPassword(e) {
    if (password === e.target.value) setConfirmPasswordError(false)
    else setConfirmPasswordError(true)
    setConfirmPassword(e.target.value)
  }

  function onSubmit() {
    api
      .put('/users/edit-password', { password: password })
      .then(setTimeout(() => {
        navigate(0)
      }, 500))
      .catch((error) => {
        console.log(error)
      })
    console.log(password)
  }

  return (
    <div className="row justify-content-center"  style={{ minHeight:'100vh'}}>
      <Form style={{ width: '50%' }}>
        <Form.Group className="mb-3">
          <Input
            maxLength={20}
            style={{
              width: "100%",
              margin: 0
            }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={onChangePassword}
          />
          {passwordError && (
            <div className="invalid-input">
              최소 8자리, 영문, 숫자, 특수문자 모두 포함해주세요.
            </div>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Input
            maxLength={20}
            style={{
              width: "100%",
              margin: 0
            }}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
          />
          {confirmPasswordError && (
            <div className="invalid-input">
              비밀번호가 일치하지 않습니다.
            </div>
          )}
        </Form.Group>
        <MyButton
          style={{
            width: "100%",
            marginBottom: "1rem"
          }}
          onClick={onSubmit}
          
        >
          비밀번호 수정
        </MyButton>
        <MyButton
          style={{width: "100%"}}
          onClick={() => {navigate(-1)}}
        >
          뒤로가기
        </MyButton>
      </Form>
    </div>
  )
}