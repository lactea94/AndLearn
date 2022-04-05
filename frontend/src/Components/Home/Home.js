import { ACCESS_TOKEN } from 'constants'
import { Carousel, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { MyButton } from 'styles/Button'
import * as S from './Style'

export function Home() {
  const token = localStorage.getItem(ACCESS_TOKEN)
  const items = [
    {id: 1, img: '/images/allu-1.png'},
    {id: 2, img: '/images/allu-2.png'},
    {id: 3, img: '/images/allu-3.png'},
  ]
  const Carousels = items.map((item) => {
    return (
      <Carousel.Item key={item.id}>
        <S.Image src={item.img} alt={item.img}/>
      </Carousel.Item>
  )})

  return (
    <S.Contents>
      <br/>
      <S.HeaderText>재밌는 영어 공부, AI랑 같이 해요!</S.HeaderText>
      <S.Header>
        <Col>
          <S.Image src="/images/logo.svg"/>
        </Col>
      </S.Header>
      <S.HeaderInfo>▼ 밑으로 내려보세요!</S.HeaderInfo>
      <S.Body>
        <br/>
        <S.ServiceContent>
          <S.ServiceTitle><span style={{ color: '#58C063' }}>AndLearn</span>이란??</S.ServiceTitle>
          <S.ServiceText>영어가 낯선사람을 위한 언어학습 서비스 입니다.</S.ServiceText>
          <S.ServiceText>외국어를 학습에 있어 가장 효과적인 방법들을 바탕으로 서비스를 제작하였습니다. </S.ServiceText>
          <S.ServiceText>아래의 과정을 통해 언어 습득의 3가지 관점에 따라 언어를 학습하는 방법을 제공합니다.</S.ServiceText>
        </S.ServiceContent>
        <S.EmphasizeText><span style={{ color: '#58C063' }}>그럼 저희 서비스 한번 보실래요?</span></S.EmphasizeText>
        <S.Image src="/images/example.jpg"/>
        <S.FirstStepContent>
          <Col xs={12} sm={12} xl={8}>
            <S.ContentTitle>어떻게 묘사하실 건가요??</S.ContentTitle>
            <br/>
            <S.ContentText>이 사진을 보고 바로 영어로 말할 수 있으셨나요?</S.ContentText>
            <S.ContentEmphasizeText><span style={{ color: '#58C063' }}>인지적 관점에 따르면</span></S.ContentEmphasizeText>
            <S.ContentText>이미지를 보고 표현하는 과정을 통해 자연스럽게 언어를 학습하게 됩니다!</S.ContentText>
          </Col>
          <Col xs={12} sm={12} xl={4}>
            <S.Mascot src="/images/allu-1.svg"/>
          </Col>
        </S.FirstStepContent>
        <S.Image src="asdf.png" alt='단어가 나오고 녹음하는 부분 이미지'></S.Image>
        <S.SecondStepContent>
          <Col xs={12} sm={12} xl={4}>
            <S.Mascot src="/images/allu-2.svg"/>
          </Col>
          <Col xs={12} sm={12} xl={8}>
            <S.ContentTitle>AI가 보여주는 단어들로 새 문장을 만들어봐요!</S.ContentTitle>
            <S.ContentEmphasizeText><span style={{ color: '#58C063' }}>새로운 단어를 내것으로 만드는 구성적 관점</span>과</S.ContentEmphasizeText> 
            <S.ContentEmphasizeText><span style={{ color: '#58C063' }}>반복과 모방을 통한 행동적 관점</span>의 학습 방법을 제공합니다.</S.ContentEmphasizeText> 
          </Col>
        </S.SecondStepContent>
        <S.ThirdStepContent>
          <S.RecommandEmphasizeText><span style={{ color: '#58C063' }}>AndLearn</span>은 영어가 낯선 분들을 위한 서비스 입니다.</S.RecommandEmphasizeText>
          <S.RecommandEmphasizeText>사진을 보고 자유롭게 연습해 보세요.</S.RecommandEmphasizeText>
        </S.ThirdStepContent>
        <S.Content>
          <Carousel>
            {Carousels}
          </Carousel>
        </S.Content>
        <S.Content>
          { token ? 
          <Link to='learn'>
            <MyButton style={{ padding : "1.5rem", fontSize: "2rem"}}>
              시도해 보시겠어요?
            </MyButton>
          </Link>
          :
          <Link to='login'>
            <MyButton style={{ padding : "3rem", fontSize: "2rem" }}>
              시도해 보시겠어요?
            </MyButton>
          </Link>
          }
        </S.Content>
      </S.Body>
    </S.Contents>
  )
};
