import Loading from 'Common/Loading/Loading';
import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom';
import Articles from './Articles/Articles';
import Create from './Articles/Create/Create';
import Pagination from './Pagination/Pagination';
import { Search } from './Search/Search';
import { apiInstance } from 'api';
import * as S from './Style';
import { API_BASE_URL } from 'constants';

export function Community() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [limit, setLimit] = useState(10);
  const [searchCategory, setSearchCategory] = useState("title");
  const [searchText, setSearchText] = useState("");
  const [filteredArticles, setFilterdArticle] = useState([]);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [me, setMe] = useState({});

  useEffect(() => {
    apiInstance().get(API_BASE_URL + '/users/me')
      .then((response) => setMe(response.data))
  }, [])

  useEffect(() => {
    apiInstance().get(API_BASE_URL + '/community')
    .then((response) => setArticles(response.data))
  }, []);

  useEffect(() => {
    apiInstance().get(API_BASE_URL + '/community/notice')
    .then((response) => setNotices(response.data))
  }, []);

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
                <Create me={me}/>
              </Row>
            </Container>
          </Row>
          <Row className="justify-content-center align-items-center">
            <Pagination 
              total={filteredArticles.length}
              limit={limit}
              page={page}
              setPage={setPage}
              setLimit={setLimit}
            />
          </Row>
        </Container>
      )}
    </>
  )
};