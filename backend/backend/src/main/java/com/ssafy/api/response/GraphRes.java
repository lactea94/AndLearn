package com.ssafy.api.response;

import com.ssafy.db.entity.Learn;
import com.ssafy.db.repository.LearnRepository;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GraphRes {
    @ApiModelProperty(name="1월 학습량", example="2")
    private int Jan;

    @ApiModelProperty(name="2월 학습량", example="3")
    private int Feb;

    @ApiModelProperty(name="3월 학습량", example="10")
    private int Mar;

    @ApiModelProperty(name="4월 학습량", example="5")
    private int Apr;

    @ApiModelProperty(name="5월 학습량", example="2")
    private int May;

    @ApiModelProperty(name="6월 학습량", example="1")
    private int Jun;

    @ApiModelProperty(name="7월 학습량", example="9")
    private int Jul;

    @ApiModelProperty(name="8월 학습량", example="5")
    private int Aug;

    @ApiModelProperty(name="9월 학습량", example="2")
    private int Sep;

    @ApiModelProperty(name="10월 학습량", example="9")
    private int Oct;

    @ApiModelProperty(name="11월 학습량", example="4")
    private int Nov;

    @ApiModelProperty(name="12월 학습량", example="1")
    private int Dec;

    public GraphRes(int cnt1, int cnt2, int cnt3, int cnt4, int cnt5, int cnt6, int cnt7, int cnt8, int cnt9, int cnt10, int cnt11, int cnt12) {

        this.Jan = cnt1;
        this.Feb = cnt2;
        this.Mar = cnt3;
        this.Apr = cnt4;
        this.May = cnt5;
        this.Jun = cnt6;
        this.Jul = cnt7;
        this.Aug = cnt8;
        this.Sep = cnt9;
        this.Oct = cnt10;
        this.Nov = cnt11;
        this.Dec = cnt12;
    }




}
