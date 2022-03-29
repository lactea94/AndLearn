package com.ssafy.api.response;

import com.ssafy.db.entity.Learn;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PicturesRes {


    private Long id;
    private String pictureUrl;
    private LocalDateTime createdDate;

    public PicturesRes(Learn entity) {
        this.id = entity.getId();
        this.pictureUrl = entity.getPictureUrl();
        this.createdDate = entity.getCreatedDate();

    }
}
