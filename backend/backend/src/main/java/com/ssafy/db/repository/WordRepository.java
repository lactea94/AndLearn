package com.ssafy.db.repository;

import com.ssafy.db.entity.Learn;
import com.ssafy.db.entity.Record;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WordRepository extends JpaRepository<Word,Long> {
    List<Word> findAllByLearn(Learn learn);
    Optional<Word> findById(Long id);
}
