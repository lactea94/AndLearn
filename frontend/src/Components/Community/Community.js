import Loading from 'Common/Loading/Loading';
import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom';
import Articles from './Articles/Articles';
import Create from './Articles/Create/Create';
import Pagination from './Pagination/Pagination';
import { Search } from './Search/Search';
import { apiInstance } from 'api';
import { ACCESS_TOKEN } from 'constants/index.js'
import { useNavigate } from 'react-router-dom'
import * as S from './Style';

export function Community() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [limit, setLimit] = useState(10);
  const [reload, setReload] = useState(true);
  const [searchCategory, setSearchCategory] = useState("title");
  const [searchText, setSearchText] = useState("");
  const [filteredArticles, setFilterdArticle] = useState([]);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [me, setMe] = useState({});
  const navigate = useNavigate();

  if (!localStorage.getItem(ACCESS_TOKEN)) {
    navigate('/')
  }

  useEffect(() => {
    apiInstance().get('/users/me')
      .then((response) => setMe(response.data))
  }, [])

  useEffect(() => {
    if (reload)
    apiInstance().get('/community')
    .then((response) => setArticles(response.data))
    .then(apiInstance().get('/community/notice').then((response) => setNotices(response.data)))
    .then(setReload(false))
  }, [reload]);

  useEffect(() => {
    if (searchCategory === 'title') {
      setFilterdArticle(() => 
        articles.filter((article) => 
          article.title.toLowerCase().includes(searchText.toLowerCase())
    ))} else if (searchCategory === 'content') {
      setFilterdArticle(() => 
        articles.filter((article) => 
          article.body.toLowerCase().includes(searchText.toLowerCase())
    ))}
  }, [searchText, articles, searchCategory]);

  useEffect(() => {
    setLoading(false)
  }, [filteredArticles])

  return (
    <>
      { loading ? (
        <Loading/>
      ) : (
        <Container style={{marginTop:'5rem'}}>
          <S.Header>Community</S.Header>
          <Row>
            <Outlet />
          </Row>
          <Row>
            <Articles
              notices={notices}
              articles={filteredArticles}
              offset={offset}
              limit={limit}
              me={me}
            />
          </Row>
          <Row>
            <Container style={{width: '90%'}}>
              <Row
                className="justify-content-between align-items-center"
                style={{marginTop: "1rem"}}
              >
                <Search
                  setSearchText={setSearchText}
                  setSearchCategory={setSearchCategory}
                  setPage={setPage}
                />
                <Create me={me} setReload={setReload}/>
              </Row>
            </Container>
          </Row>
          <Pagination 
            total={filteredArticles.length}
            limit={limit}
            page={page}
            setPage={setPage}
            setLimit={setLimit}
          />
        </Container>
      )}
    </>
  )
};