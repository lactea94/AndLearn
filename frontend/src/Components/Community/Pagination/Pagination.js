import { Pagination as Page }  from "react-bootstrap";

export default function Pagination({ total, limit, page, setPage}) {
  const numPages = Math.ceil(total / limit);
  console.log(page)
  return (
    <Page>
      <Page.First onClick={() => setPage(1)} disabled={page === 1}></Page.First>
      <Page.Prev onClick={() => setPage(page - 1)} disabled={page === 1}></Page.Prev>
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <Page.Item
            key={i + 1}
            onClick={() => setPage(i + 1)}
            active={(page === i + 1)}
          >
            {i + 1}
          </Page.Item>
      ))}
      <Page.Next onClick={() => setPage(page + 1)} disabled={page === numPages}></Page.Next>
      <Page.Last onClick={() => setPage(numPages)} disabled={page === numPages}></Page.Last>
    </Page>
  )
}
