package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="record")
public class Record extends BaseEntity{

    @Column(nullable = false)
    private String recordUrl;

    @Column
    private Integer recordTime;

    @Column
    private String sentence;

    @ManyToOne
    @JoinColumn(name="learn_id", nullable = false)
    private Learn learn;
}
