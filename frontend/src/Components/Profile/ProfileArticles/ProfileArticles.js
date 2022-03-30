import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom';
import Articles from './Articles/Articles';
import Pagination from './ProfilePagination';

export function ProfileArticles() {
  const currentUser = 2
  const [articles, setArticles] = useState([]);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilterdArticle] = useState([]);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then((data) => setArticles(data.sort((a, b) => b.id - a.id)))
  }, []);

  useEffect(() => {
    setFilterdArticle(() => 
      articles.filter((article) => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [searchTerm, articles]);

  return (
    <Container style={{ minHeight:'100vh'}}>
      <Row>
        <Outlet />
      </Row>
      <Row>
        <Articles
          articles={filteredArticles}
          offset={offset}
          limit={limit}
          currentUser={currentUser}
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
  )
};