import { apiInstance } from "api"
import { API_BASE_URL } from "constants"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./Style";

export function Delete({ commentId }) {
    const { articleId } = useParams();
    const navigate = useNavigate();

    const handleClick = () => {
        apiInstance().delete(API_BASE_URL + `/community/${articleId}/comment/${commentId}`)
    }

    return (
    <S.Button onClick={handleClick}>삭제</S.Button>
    )
}
