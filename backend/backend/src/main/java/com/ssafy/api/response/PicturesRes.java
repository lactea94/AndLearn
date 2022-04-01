package com.ssafy.api.response;

import com.ssafy.db.entity.Learn;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("PictureResponse")
public class PicturesRes {

    @ApiModelProperty(name="learn ID", example="3")
    private Long id;

    @ApiModelProperty(name="사진 URL", example="https://d3qljd3xvkb8gz.cloudfront.net/17ff379.png")
    private String pictureUrl;

    @ApiModelProperty(name="learn 생성 날짜", example="2022-03-29 17:18:49.344082")
    private LocalDateTime createdDate;

    public PicturesRes(Learn entity) {
        this.id = entity.getId();
        this.pictureUrl = entity.getPictureUrl();
        this.createdDate = entity.getCreatedDate();

    }
}
