package com.ssafy.api.response;

import com.ssafy.db.entity.Word;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WordRes {

    private Long id;
    private String content;

    public WordRes(Word word) {
        this.id = word.getId();
        this.content = word.getContent();
    }
}
