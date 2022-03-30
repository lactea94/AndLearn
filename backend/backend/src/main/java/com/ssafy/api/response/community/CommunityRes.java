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
@ApiModel("CommunityLGetResponse")
public class CommunityRes {
    @ApiModelProperty(name = "seq", example = "1")
    private Long id;

    @ApiModelProperty(name = "게시글 제목", example = "this is community title")
    private String title;

    @ApiModelProperty(name = "게시글 생성 날짜", example = "2022-03-28 15:22:46.202311")
    private LocalDateTime createdAt;

    @ApiModelProperty(name = "게시글 수정 날짜", example = "2022-03-29 13:22:43.342363")
    private LocalDateTime updatedAt;

    @ApiModelProperty(name = "게시글 내용", example = "this is community content")
    private String content;

    private Long userId;
    private String nickname;
    private String imgUrl;

    public CommunityRes(Community entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.createdAt = entity.getCreatedDate();
        this.updatedAt = entity.getUpdatedDate();
        this.content = entity.getContent();
        User user = entity.getUser();
        this.userId = user.getId();
        this.nickname = user.getNickname();
        this.imgUrl = user.getImage_url();

    }

}
