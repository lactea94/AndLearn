import { Pagination as Page }  from "react-bootstrap";

export default function Pagination({ total, limit, page, setPage}) {
  const numPages = Math.ceil(total / limit);
  const Pages = () => {
    const array = () => {
      if (page < 4) {
        return [1, 2, 3, 4, 5]
      } else if (page > numPages - 3) {
        return [numPages - 4, numPages - 3, numPages - 2, numPages - 1, numPages]
      } else {
        return [page - 2, page - 1, page , page + 1]
      }
    }
    return (
      <>
        {(Page > 3) && <Page.Ellipsis />}
        {array().map(i => (
          <Page.Item
          key={i}
          onClick={() => setPage(i)}
          active={(page === i)}
          >
            {i}
          </Page.Item>
        ))}
        {(page < numPages - 2) && (numPages > 5) && <Page.Ellipsis />}
      </>
    )}

  return (
    <Page className="justify-content-center" style={{margin:"auto"}}>
      <Page.First onClick={() => setPage(1)} disabled={page === 1}></Page.First>
      <Page.Prev onClick={() => setPage(page - 1)} disabled={page === 1}></Page.Prev>
      <Pages/>
      <Page.Next onClick={() => setPage(page + 1)} disabled={page === numPages}></Page.Next>
      <Page.Last onClick={() => setPage(numPages)} disabled={page === numPages}></Page.Last>
    </Page>
  )
}
