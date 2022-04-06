import { Alert, Form } from "react-bootstrap"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { MyButton } from "styles/Button"
import styled from "styled-components"
import { apiInstance } from "api"
import { Input } from "styles/Input"

const MyForm = styled(Form)`
  @media screen and (min-width: 576px) {
    width: 50%;
  }
  width: 90%;
`

export function UserInfoEdit() {
  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState(false);
  const [dName, setDName] = useState('');
  const [checkValues, setCheckValues] = useState('');
  const [imgBase64, setImgBase64] = useState([]); // 파일 base64
  const [imgFile, setImgFile] = useState(null);	//파일

  const navigate = useNavigate();
  const api = apiInstance();

  function onChangeUserName(e) {
    setUserNameError(false)
    setUserName(e.target.value)
  }

  const handleChangeFile = (event) => {
    setImgFile(event.target.files[0]);
    console.log(imgFile)
    setImgBase64([]);
    
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
    // 파일 상태 업데이트
    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
      var base64Sub = base64.toString()
        
      setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
      }
    }
  }

  function onCheckName() {
    api
      .post('/users/duplicate-check-nickname', {
        nickname: userName,
      })
      .then((res) => {
        setDName('');
      })
      .catch((error) => {
        setDName('이미 존재하는 이름입니다.');
      })
  }

  function onSubmit() {
    if (userName || imgFile) {
      // 닉네임 수정 api
      if (userName) {
        api
        .put("/users/edit", {
          nickname: userName,
        })
        .then(setTimeout(() => {
          navigate(0)
        }, 500))
      }     

      if (imgFile) {
        const fd = new FormData();
        fd.append("multipartFile", imgFile);

        // 프로필 사진 수정 api
        api
        .put("/users/image", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })
        .then(setTimeout(() => {
          navigate(0)
        }, 500))
      }
    } else {
      setCheckValues('변경사항이 없습니다.')
    }
  }

  return (
    <div className="row justify-content-center"  style={{ minHeight:'100vh'}}>
      <MyForm>
        <Form.Group className="mb-4">
          <Input
            maxLength={20}
            style={{width: "100%", margin: 0}}
            placeholder="Nickname"
            value={userName}
            onChange={onChangeUserName}
          />
        </Form.Group>
        { dName && <Alert variant="warning">{dName}</Alert> }
        {userNameError && (
          <div className="invalid-input">닉네임을 입력해주세요.</div>
        )}
        <div className="mb-4">
          {imgBase64.map((item, index) => {
            return(
              <img
                key={index}
                className="d-block w-100"
                src={item}
                alt="First slide"
                style={{width:"100%"}}
              />
            )
          })}
        </div>
        <Form.Group className="mb-4">
          <Input 
            type="file" 
            id="file"
            style={{width: "100%", margin: 0}}
            onChange={handleChangeFile}
            placeholder="프로필 사진"
          />
        </Form.Group>
        <MyButton
          color="#58C063"
          style={{width: "100%", marginBottom: "1.5rem"}}
          onClick={() => {onSubmit(); onCheckName();}}
        >
          회원 정보 수정
        </MyButton>
        { checkValues && <Alert variant="warning">{checkValues}</Alert> }
        <Link to={`password`}>
          <MyButton
            style={{
              width: "100%"
            }}
          >
            비밀번호를 수정하려면 클릭!!
          </MyButton>
        </Link>
      </MyForm>
    </div>
  )
}