package com.ssafy.api.response;

import com.ssafy.db.entity.Learn;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("StatisticsResponse")
public class StatisticsRes {

    @ApiModelProperty(name="learn ID", example="3")
    private Long id;

    @ApiModelProperty(name="learn 생성 날짜", example="2022-03-29 17:18:49.344082")
    private LocalDateTime createdDate;

    @ApiModelProperty(name="발음 평가 점수", example="3.5")
    private Float score;

    public StatisticsRes(Learn entity) {
        this.id = entity.getId();
        this.createdDate = entity.getCreatedDate();
        this.score = entity.getScore();

    }


}
