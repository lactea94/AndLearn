package com.ssafy.db.repository;

import com.ssafy.db.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CommunityRepository extends JpaRepository<Community, Long> {
    Optional<Community> findById(Long id);

    @Query(value = "select id, title, content, createdData, updateDate from Community", nativeQuery = true)
    List<Object[]> findCommunityList();
}
