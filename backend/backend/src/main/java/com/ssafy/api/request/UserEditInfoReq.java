package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserEditPutRequest")
public class UserEditInfoReq {
    @ApiModelProperty(name="유저 Nickname", example="your_nickname")
    String nickname;
    @ApiModelProperty(name = "유저 imagename", example = "asdfasdf.png")
    String image_name;
}
