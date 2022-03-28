package com.ssafy.api.response;

import com.ssafy.db.entity.Learn;

import java.time.LocalDateTime;

public class StatisticsRes {

    private Long id;
    private LocalDateTime createdDate;

    public StatisticsRes(Learn entity) {
        this.id = entity.getId();
        this.createdDate = entity.getCreatedDate();

    }
}
