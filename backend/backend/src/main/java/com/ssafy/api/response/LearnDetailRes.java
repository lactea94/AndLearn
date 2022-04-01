package com.ssafy.api.response;

import com.ssafy.db.entity.Learn;
import com.ssafy.db.entity.Record;
import com.ssafy.db.entity.Word;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ApiModel("LearnDetailResponse")
public class LearnDetailRes {
    @ApiModelProperty(name="사진 URL", example="https://d3qljd3xvkb8gz.cloudfront.net/17ff379.png")
    private String pictureUrl;

    @ApiModelProperty(name="learn 생성 날짜", example="2022-03-29 17:18:49.344082")
    private LocalDateTime createdDate;

    @ApiModelProperty(name="발음평가 점수", example="3.5")
    private Float score;

    @ApiModelProperty(name="사용자의 녹음 기록", example="[https://d3qljd3xvkb8gz.cloudfront.net/17ff379.mp3,https://d3qljd3xvkb8gz.cloudfront.net/1233dd.mp3]")
    private List<RecordRes> records;

    @ApiModelProperty(name="AI 추천 단어들", example="[cake,birthday]")
    private List<WordRes> words;

    @ApiModelProperty(name="유저 ID", example="2")
    private String userId;

    public LearnDetailRes(Learn entity) {


        this.pictureUrl = entity.getPictureUrl();
        this.createdDate = entity.getCreatedDate();
        this.score = entity.getScore();

        List<Record> tmpRecords = entity.getRecords();
        List<RecordRes> myRecords = new ArrayList<>();
        tmpRecords.forEach(record -> {
            myRecords.add(new RecordRes(record));
        });
        this.records = myRecords;

        List<Word> tmpWords = entity.getWords();
        List<WordRes> myWords = new ArrayList<>();
        tmpWords.forEach(word -> {
            myWords.add(new WordRes(word));
        });
        this.words = myWords;
    }

}
