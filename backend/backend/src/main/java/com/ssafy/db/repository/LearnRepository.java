package com.ssafy.db.repository;

import com.ssafy.db.entity.Learn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LearnRepository extends JpaRepository<Learn,Long> {
    Optional<Learn> findById(Long id);
}
