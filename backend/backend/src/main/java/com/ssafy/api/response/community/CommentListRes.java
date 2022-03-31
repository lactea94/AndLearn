package com.ssafy.api.response.community;

import com.ssafy.db.entity.Comment;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("CommentListGetResponse")
public class CommentListRes {

    private Long userId;
    private String nickname;
    private String imgUrl;

    @ApiModelProperty(name = "seq", example = "1")
    private Long id;

    @ApiModelProperty(name = "댓글 내용", example = "this is comment content")
    private String content;

    @ApiModelProperty(name = "댓글 생성 날짜", example = "2022-03-30 14:40:23.323425")
    private LocalDateTime createdDate;

    public CommentListRes(Comment entity) {
        this.id = entity.getId();
        this.content = entity.getContent();
        this.createdDate = entity.getCreatedDate();
        User user = entity.getUser();
        this.nickname = user.getNickname();
        this.userId = user.getId();
        this.imgUrl = user.getImageUrl();
    }

}
