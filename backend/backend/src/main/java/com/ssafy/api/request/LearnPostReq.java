package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("LearnPostRequest")
public class LearnPostReq {

    @ApiModelProperty(name="AI 추천 단어들", example="[cake,birthday]")
    List<String> words;
//    List<Integer> times;

    @ApiModelProperty(name="사용자가 말한 문장들", example="[hello my name is jh, happy birthday]")
    List<String> sentences;
}
