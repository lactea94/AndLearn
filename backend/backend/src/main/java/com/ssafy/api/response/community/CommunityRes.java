package com.ssafy.api.response.community;

import com.ssafy.db.entity.Community;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommunityRes {
    @ApiModelProperty(name = "seq", example = "1")
    Long id;

    @ApiModelProperty(name = "게시글 제목", example = "this is community title")
    String title;

    @ApiModelProperty(name = "게시글 생성 날짜", example = "2022-03-28 15:22:46.202311")
    LocalDateTime createdAt;

    @ApiModelProperty(name = "게시글 수정 날짜", example = "2022-03-29 13:22:43.342363")
    LocalDateTime updatedAt;

    @ApiModelProperty(name = "게시글 내용", example = "this is community content")
    String content;

    public CommunityRes(Community entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.createdAt = entity.getCreatedDate();
        this.updatedAt = entity.getUpdatedDate();
        this.content = entity.getContent();
    }

}
