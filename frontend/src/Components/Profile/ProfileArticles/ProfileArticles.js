import Loading from 'Common/Loading/Loading';
import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom';
import Articles from './Articles/Articles';
import Pagination from './ProfilePagination';
import { apiInstance } from 'api';
import { MyButton } from 'styles/Button';

export function ProfileArticles() {
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const [articles, setArticles] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    apiInstance().get('/community/me')
    .then((response) => setArticles(response.data))
    .then(setLoading(false))
  }, []);

  return (
    <>
      { loading ? (
        <Loading/>
      ) : (
        <Container style={{ minHeight:'100vh'}}>
          {articles.length ? 
            <>
              <Row>
                <Articles
                  articles={articles}
                  offset={offset}
                  limit={limit}
                  user={state.user}
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
            </> : 
            <div style={{margin: "5rem"}}>
              <h3>작성한 게시글이 없습니다.</h3>
              <Link to="/community">
                <MyButton>
                    작성하러 가기
                </MyButton>
              </Link>
            </div>
          }
        </Container>
      )}
    </>
  )
};