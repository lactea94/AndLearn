package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "learn")
public class Learn extends BaseEntity{

    @Column
    private String pictureUrl;

    @Column
    private Float score;

    @Column
    private LocalDateTime createdDate;

    @JsonIgnore
    @OneToMany(mappedBy = "learn", fetch = FetchType.LAZY)
    private List<Word> words = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "learn", fetch = FetchType.LAZY)
    private List<Record> records = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;



}
