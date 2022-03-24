package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
	@ApiModelProperty(name="유저 ID", example="ssafy_web")
	String id;

//	@ApiModelProperty(name="유저 name", example="your_name")
//	String name;

	@ApiModelProperty(name="유저 nickname", example="your_nickname")
	String nickname;

	@ApiModelProperty(name="유저 Password", example="your_password")
	String password;

	@ApiModelProperty(name="유저 CreatedDate", example="your_createdDate")
	LocalDateTime createdDate;

	@ApiModelProperty(name="유저 image", example="your_image")
	String image_url;

	@ApiModelProperty(name="유저 admin", example="admin")
	Boolean admin;
}
