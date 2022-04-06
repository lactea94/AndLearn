package com.ssafy.api.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PronounceRes {
    private int result;
    private PronounceRes2 return_object;
}
