import { Pagination as Page }  from "react-bootstrap";
import { PageItem } from "./style";
import { 
  ChevronLeft,
  ChevronRight,
  ChevronDoubleLeft,
  ChevronDoubleRight
} from "react-bootstrap-icons";

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
        {(page > 3) && (numPages > 5) && <PageItem>...</PageItem>}
        {array().map(i => (
          <PageItem
            key={i}
            onClick={() => setPage(i)}
            disabled={(page === i)}
          >
            {i}
          </PageItem>
        ))}
        {(page < numPages - 2) && (numPages > 5) && <PageItem>...</PageItem>}
      </>
    )}

  return (
    <Page className="justify-content-center" style={{margin:"auto"}}>
      <PageItem onClick={() => setPage(1)} disabled={page === 1}>
        <ChevronDoubleLeft/>
      </PageItem>
      <PageItem onClick={() => setPage(page - 1)} disabled={page === 1}>
        <ChevronLeft/>
      </PageItem>
      <Pages/>
      <PageItem onClick={() => setPage(page + 1)} disabled={page === numPages}>
        <ChevronRight/>
      </PageItem>
      <PageItem onClick={() => setPage(numPages)} disabled={page === numPages}>
        <ChevronDoubleRight/>
      </PageItem>
    </Page>
  )
}
