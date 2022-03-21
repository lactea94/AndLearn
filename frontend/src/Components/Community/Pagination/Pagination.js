import * as S from "./style";
import { 
  ChevronLeft,
  ChevronRight,
  ChevronDoubleLeft,
  ChevronDoubleRight,
  ThreeDots
} from "react-bootstrap-icons";
import { 
  Form,
  OverlayTrigger,
  Popover,
  Tooltip
} from "react-bootstrap";

export default function Pagination({ total, limit, page, setPage, setLimit }) {
  const numPages = Math.ceil(total / limit);

  const popover = (
    <Popover>
      <Popover.Header as="h3">페이지 이동</Popover.Header>
      <Popover.Body>
        <Form
          onSubmit={function (event) {
            event.preventDefault();
            setPage(event.target.page.value);
          }}
        >
          <Form.Group className="mb-3">
            <S.FormControl
              placeholder={numPages}
              size="sm"
              name="page"
              type="text"
            />
          </Form.Group>
          <S.PageButton size="sm" type="submit">이동</S.PageButton>
        </Form>
      </Popover.Body>
    </Popover>
  );

  const PageSelect = () => {
    return (
      <OverlayTrigger
        trigger="click"
        placement="top"
        overlay={popover}
      >
        <S.PageItem><ThreeDots/></S.PageItem>
      </OverlayTrigger>
    )
  };

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
        {(page > 3) && (numPages > 5) && <PageSelect/>}
        {array().map(i => (
          <S.PageItem
            key={i}
            onClick={() => setPage(i)}
            current={page === i ? 1 : 0}
          >
            {i}
          </S.PageItem>
        ))}
        {(page < numPages - 2) && (numPages > 5) && <PageSelect/>}
      </>
    )};

  return (
    <div>
      <S.PageContainer>
        <S.PageItem onClick={() => setPage(1)} disabled={page === 1}>
          <ChevronDoubleLeft/>
        </S.PageItem>
        <S.PageItem onClick={() => setPage(page - 1)} disabled={page === 1}>
          <ChevronLeft/>
        </S.PageItem>
        <Pages/>
        <S.PageItem onClick={() => setPage(page + 1)} disabled={page === numPages}>
          <ChevronRight/>
        </S.PageItem>
        <S.PageItem onClick={() => setPage(numPages)} disabled={page === numPages}>
          <ChevronDoubleRight/>
        </S.PageItem>
      </S.PageContainer>
      <S.PageContainer>
        <OverlayTrigger
          overlay={
            <Tooltip>
              페이지 당 게시글 수
            </Tooltip>
          }
        >
          <S.PageLimit
            type="number"
            value={limit}
            style={{width:'5rem'}}
            onChange={({ target: { value } }) => {
              setLimit(Number(value))
              setPage(1)
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </S.PageLimit>
        </OverlayTrigger>
      </S.PageContainer>
    </div>
  )
};
