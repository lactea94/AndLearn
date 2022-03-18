import { PageContainer, PageItem } from "./style";
import { 
  ChevronLeft,
  ChevronRight,
  ChevronDoubleLeft,
  ChevronDoubleRight,
  ThreeDots
} from "react-bootstrap-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Pagination({ total, limit, page, setPage, setLimit }) {
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
        {(page > 3) && (numPages > 5) && <PageItem><ThreeDots/></PageItem>}
        {array().map(i => (
          <PageItem
            key={i}
            onClick={() => setPage(i)}
            disabled={(page === i)}
          >
            {i}
          </PageItem>
        ))}
        {(page < numPages - 2) && (numPages > 5) && <PageItem><ThreeDots/></PageItem>}
      </>
    )}

  return (
    <PageContainer>
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
      <OverlayTrigger
            overlay={
              <Tooltip>
                페이지 당 게시글 수
              </Tooltip>
            }
          >
            <select
              type="number"
              value={limit}
              onChange={({ target: { value } }) => {
                setLimit(Number(value))
                setPage(1)
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </OverlayTrigger>
    </PageContainer>
  )
}
