import Loading from 'Common/Loading/Loading';
import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom';
import Articles from './Articles/Articles';
import Create from './Articles/Create/Create';
import Pagination from './Pagination/Pagination';
import { Search } from './Search/Search';

export function Community() {

  const notices = [
    { id: 1230, userId: 1, title:'2', body:'123123', created_at: '2022. 03. 10 11:14'},
    { id: 1231, userId: 1, title:'1', body:'123123', created_at: '2022. 03. 14 13:10'},
    { id: 1233, userId: 1, title:'3', body:'123123', created_at: '2022. 03. 21 11:14'},
  ];
  const [loading, setLoading] = useState(true);
  notices.sort((a, b) => a.id - b.id);
  const currentUser = 2
  const [articles, setArticles] = useState([]);
  const [limit, setLimit] = useState(10);
  const [searchCategory, setSearchCategory] = useState("title");
  const [searchText, setSearchText] = useState("");
  const [filteredArticles, setFilterdArticle] = useState([]);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then((data) => setArticles(data.sort((a, b) => b.id - a.id)))
  }, []);

  useEffect(() => {
    if (searchCategory === 'title') {
      setFilterdArticle(() => 
        articles.filter((article) => 
          article.title.toLowerCase().includes(searchText.toLowerCase())
        )
      )
    } else if (searchCategory === 'body') {
      setFilterdArticle(() => 
        articles.filter((article) => 
          article.body.toLowerCase().includes(searchText.toLowerCase())
        )
      )
    }
    
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
          <h1>Community</h1>
          <Row>
            <Outlet />
          </Row>
          <Row>
            <Articles
              notices={notices}
              articles={filteredArticles}
              offset={offset}
              limit={limit}
              currentUser={currentUser}
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
                <Create />
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