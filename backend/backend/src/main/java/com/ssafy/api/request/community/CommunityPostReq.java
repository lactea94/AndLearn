package com.ssafy.api.request.community;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CommunityPostReq")
public class CommunityPostReq {
    @ApiModelProperty(name = "게시글 제목", example = "this is title of community")
    String title;

    @ApiModelProperty(name = "게시글 내용", example = "this is content of community")
    String content;
}
