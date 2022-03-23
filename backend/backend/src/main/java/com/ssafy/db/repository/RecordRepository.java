package com.ssafy.db.repository;

import com.ssafy.db.entity.Learn;
import com.ssafy.db.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecordRepository extends JpaRepository<Record,Long> {
    Optional<Record> findById(Long id);
}
