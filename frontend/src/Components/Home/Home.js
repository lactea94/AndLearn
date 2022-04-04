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
        <Col xs={8}>
          <S.Image src="/images/logo.png"/>
        </Col>
        <Col xs={4}>
          <S.Image src="/images/allu-3.png"/>
        </Col>
      </S.Header>
      <S.Body>
        <S.Content>
          <S.Image src="/images/example.jpg"/>
        </S.Content>
        <S.Content>
          <Col>
            "People are having a birthday party."<br/>
            이 사진을 보고 바로 영어로 말할 수 있으셨나요?<br/>
          </Col>
          <Col xs={4}>
            <S.Image src="/images/allu-1.png"/>
          </Col>
        </S.Content>
        <S.Content>
          <Col xs={4}>
            <S.Image src="/images/allu-2.png"/>
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
