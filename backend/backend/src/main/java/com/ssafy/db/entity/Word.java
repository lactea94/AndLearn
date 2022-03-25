package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "word")
public class Word extends BaseEntity{

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name="learn_id", nullable = false)
    private Learn learn;
}
