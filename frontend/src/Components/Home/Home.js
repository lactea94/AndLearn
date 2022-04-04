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
      <S.Header>
        <Col>
          <S.Image src="/images/logo.svg"/>
        </Col>
      </S.Header>
      <S.Body>
        <S.Content>
          <h1>AndLearn 서비스란??</h1>
          <Col xs={8}>영어가 낯선사람을 위한 언어습득 서비스 입니다.</Col>
          <Col xs={4}></Col>
          <Col xs={12}>외국어를 습득에 있어 가장 효과적인 방법들을 바탕으로 서비스를 제작하였습니다. </Col>
          <Col xs={12}>아래의 과정을 통해 언어 습득의 3가지 관점에 따라 언어를 습득할 수 있도록 도왔습니다.</Col>
          <S.Image src="/images/example.jpg"/>
        </S.Content>
        <S.Content>
          <Col xs={8}>
            <h1>어떻게 묘사하실 건가요??</h1><br/>
            이 사진을 보고 바로 영어로 말할 수 있으셨나요?<br/>
            <h2>인지주의적 관점에 따르면 해당 활동을 통해</h2>
          <Col xs={12}>이미지를 보고 자신의 언어로 변환하는 과정을 통해 자연스럽게 언어를 습득하게 됩니다!!</Col>
          </Col>
          <Col xs={4}>
          <S.Image src="/images/allu-1.svg"/>
          </Col>
        </S.Content>
        <S.Content>
          <Col xs={12}>
          <S.Image src="asdf.png" alt='단어가 나오고 녹음하는 부분 이미지'></S.Image></Col>
          <Col xs={4}>
            <S.Image src="/images/allu-2.svg"/>
          </Col>
          <Col xs={8}>
            추가된 단어들을 넣어 새로운 묘사를 진행해 보세요.<br/>
            새 언어에 노출이 되고 이미 알고있는 사전 지식 안으로 통합하는 과정으로 언어를 내것으로 만들 수 있어요<br/>
            새로운 단어를 내것으로 만드는 구성주의적 관점과 반복과 모방을 통한 행동주의적 관점의 학습 방법을 제공합니다.
          </Col>
          <Col>
            AndLearn은 영어가 낯선 분들을 위한 서비스 입니다.<br/>
            사진을 보고 자유롭게 연습해 보세요.<br/>
            </Col>
        </S.Content>
        <S.Content>
          <Carousel>
            {Carousels}
          </Carousel>
        </S.Content>
        <S.Content>
          { token ? 
          <Link to='learn'>
            <MyButton>
              시도해 보시겠어요?
            </MyButton>
          </Link>
          :
          <Link to='login'>
            <MyButton>
              시도해 보시겠어요?
            </MyButton>
          </Link>
          }
        </S.Content>
      </S.Body>
    </S.Contents>
  )
};
