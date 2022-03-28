package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LearnPostReq {

    float score;
    List<String> words;
    List<Integer> times;
    List<String> sentences;
}
