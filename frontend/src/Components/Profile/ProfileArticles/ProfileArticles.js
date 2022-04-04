import Loading from 'Common/Loading/Loading';
import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom';
import Articles from './Articles/Articles';
import Pagination from './ProfilePagination';
import { apiInstance } from 'api';

export function ProfileArticles() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [limit, setLimit] = useState(10);
  const [searchCategory, setSearchCategory] = useState("title");
  const [searchText, setSearchText] = useState("");
  const [filteredArticles, setFilterdArticle] = useState([]);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const api = apiInstance();

  useEffect(() => {
    api.get('/community/me')
    .then((response) => setArticles(response.data))
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
        <Container style={{ minHeight:'100vh'}}>
          <Row>
            <Outlet />
          </Row>
          <Row>
            <Articles
              articles={filteredArticles}
              offset={offset}
              limit={limit}
            />
          </Row>
          <Row className="justify-content-center align-items-center">
            <Pagination 
              total={articles.length}
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