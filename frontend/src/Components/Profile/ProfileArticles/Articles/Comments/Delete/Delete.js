import { apiInstance } from "api"
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./Style";

export function Delete({ commentId }) {
    const { articleId } = useParams();
    const navigate = useNavigate();

    const handleClick = () => {
        apiInstance().delete(`/community/${articleId}/comment/${commentId}`)
        .then(navigate(0))
    }

    return (
    <S.Button onClick={handleClick}>삭제</S.Button>
    )
}
