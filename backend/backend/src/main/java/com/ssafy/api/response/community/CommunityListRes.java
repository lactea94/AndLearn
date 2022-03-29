package com.ssafy.api.response.community;

import com.ssafy.db.entity.Community;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("CommunityListGetResponse")
public class CommunityListRes {
    @ApiModelProperty(name = "seq", example = "1")
    Long id;

    @ApiModelProperty(name = "게시판 제목", example = "this is community title")
    String title;

    @ApiModelProperty(name = "게시판 생성 날짜", example = "2022-03-28 15:20:24.340005")
    LocalDateTime createdAt;
    @ApiModelProperty(name = "게시판 생성 날짜", example = "2022-03-28 15:20:24.340005")
    LocalDateTime updatedAt;

    public CommunityListRes(Community entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.createdAt = entity.getCreatedDate();
        this.updatedAt = entity.getUpdatedDate();
    }
}
