package com.ssafy.api.request.community;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CommentPostReq")
public class CommentPostReq {
    @ApiModelProperty(name = "댓글 내용", example = "this is content of comment")
    String content;

}
