package com.ssafy.api.response.community;

import com.ssafy.db.entity.Community;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("CommunityListGetResponse")
public class CommunityListRes {
    private Long userId;
    private String nickname;
    private String imgUrl;

    @ApiModelProperty(name = "seq", example = "1")
    private Long id;

    @ApiModelProperty(name = "게시판 제목", example = "this is community title")
    private String title;

    @ApiModelProperty(name = "게시판 생성 날짜", example = "2022-03-28 15:20:24.340005")
    private LocalDateTime createdAt;
    @ApiModelProperty(name = "게시판 생성 날짜", example = "2022-03-28 15:20:24.340005")
    private LocalDateTime updatedAt;

    public CommunityListRes(Community entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.createdAt = entity.getCreatedDate();
        this.updatedAt = entity.getUpdatedDate();
        User user = entity.getUser();
        this.nickname = user.getNickname();
        this.userId = user.getId();
        this.imgUrl = user.getImage_url();
    }
}
