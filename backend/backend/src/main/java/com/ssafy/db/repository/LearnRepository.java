package com.ssafy.db.repository;

import com.ssafy.api.response.PicturesRes;
import com.ssafy.db.entity.Learn;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
// Spring Data JPA 사용
public interface LearnRepository extends JpaRepository<Learn,Long> {
    List<Learn> findAllByUser(User user);
    Optional<Learn> findById(Long id);
}
