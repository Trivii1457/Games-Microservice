package com.mindgames.scoreservice.repository;

import com.mindgames.scoreservice.entity.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
    List<Score> findByUserId(Long userId);
    List<Score> findByGameId(Long gameId);

    @Query("SELECT s FROM Score s WHERE s.gameId = :gameId ORDER BY s.score DESC, s.duration ASC")
    List<Score> findTopScoresByGameId(Long gameId);
    
    @Query("SELECT s FROM Score s ORDER BY s.score DESC, s.duration ASC")
    List<Score> findAllOrderedByScore();
}

