package com.ssafy.db.repository;

import com.ssafy.db.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Optional<Comment> findById(Long id);

    List<Comment> findAllByCommunityId(Long communityId);

    @Query(value = "select * from comment", nativeQuery = true)
    List<Object[]> findCommentList();
}
