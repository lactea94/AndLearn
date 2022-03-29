package com.ssafy.api.response;

import com.ssafy.db.entity.Learn;
import com.ssafy.db.entity.Record;
import com.ssafy.db.entity.Word;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class LearnDetailRes {

    private String pictureUrl;
    private LocalDateTime createdDate;
    private Float score;
    private List<RecordRes> records;
    private List<WordRes> words;

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
