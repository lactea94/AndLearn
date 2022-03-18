import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap'
import Articles from './Articles/Articles';
import Pagination from './Pagination/Pagination';

export function Community() {

  const notices = [
    { id: 1231, userId: 1, title:'1', body:'123123', created_at: '2022. 03. 14 11:10', view_count: 1},
    { id: 1232, userId: 1, title:'2', body:'123123', created_at: '2022. 03. 10 11:14', view_count: 1},
  ];

  notices.sort((a, b) => a.id - b.id);

  // const articles = [
  //   { id: 1, title:'1', user: 'aaa', created_at: '2022. 03. 14 11:10', view_count: 1},
  //   { id: 2, title:'2', user: 'bbb', created_at: '2022. 03. 10 11:14', view_count: 1},
  //   { id: 3, title:'3', user: 'ccc', created_at: '2022. 03. 11 11:14', view_count: 1},
  //   { id: 4, title:'4', user: 'ddd', created_at: '2022. 03. 12 11:14', view_count: 1},
  //   { id: 5, title:'5', user: 'eee', created_at: '2022. 03. 13 11:14', view_count: 1},
  //   { id: 6, title:'6', user: 'aaa', created_at: '2022. 03. 13 11:14', view_count: 1},
  //   { id: 7, title:'7', user: 'bbb', created_at: '2022. 03. 14 11:14', view_count: 1},
  //   { id: 8, title:'8', user: 'ccc', created_at: '2022. 03. 14 11:20', view_count: 1},
  //   { id: 9, title:'9', user: 'ddd', created_at: '2022. 03. 14 11:21', view_count: 1},
  //   { id: 10, title:'10', user: 'eee', created_at: '2022. 03. 14 11:33', view_count: 1},
  //   { id: 11, title:'11', user: 'fff', created_at: '2022. 03. 14 11:35', view_count: 1},
  //   { id: 12, title:'12', user: 'bbb', created_at: '2022. 03. 14 11:50', view_count: 1},
  // ]

  // articles.sort((a, b) => {
  //   const x = a.created_at, y = b.created_at
  //   return  x < y ? 1: x > y ? -1 : 0;
  // })

  const [articles, setArticles] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setArticles(data.sort((a, b) => b.id - a.id)))
  }, []);

  return (
    <Container style={{marginTop:'5rem'}}>
      <Row className="justify-content-center align-items-center">
        <Pagination 
          total={articles.length}
          limit={limit}
          page={page}
          setPage={setPage}
          setLimit={setLimit}
        />
      </Row>
      <Row>
        <Articles
          notices={notices}
          articles={articles}
          offset={offset}
          limit={limit}
        />
      </Row>
    </Container>
  )
};