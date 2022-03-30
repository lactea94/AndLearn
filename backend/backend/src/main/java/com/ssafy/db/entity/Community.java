package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
@Table(name = "community")
@NoArgsConstructor
public class Community extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private LocalDateTime createdDate;

    private LocalDateTime updatedDate;

    @Column(nullable = false)
    private Boolean isNotice;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "community", fetch = FetchType.LAZY)
    private List<Comment> comments = new ArrayList<>();

    // 0328 김병완 save용 builder 추가
    @Builder
    public Community(String title, String content, LocalDateTime createdDate, LocalDateTime updatedDate, Boolean isNotice, User user) {
        this.title = title;
        this.content = content;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.isNotice = isNotice;
        this.user = user;
    }
}
