package com.mindgames.gameservice.repository;

import com.mindgames.gameservice.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findByTipo(String tipo);
    List<Game> findByDificultad(String dificultad);
}

