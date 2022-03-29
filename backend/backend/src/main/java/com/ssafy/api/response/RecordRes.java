package com.ssafy.api.response;

import com.ssafy.db.entity.Record;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecordRes {
    private Long id;
    private String recordUrl;
    private Integer recordTime;
    private String sentence;

    public RecordRes(Record record) {
        this.id = record.getId();
        this.recordUrl = record.getRecordUrl();
        this.recordTime = record.getRecordTime();
        this.sentence = record.getSentence();
    }
}
