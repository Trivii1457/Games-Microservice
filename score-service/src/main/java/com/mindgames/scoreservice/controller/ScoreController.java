package com.mindgames.scoreservice.controller;

import com.mindgames.scoreservice.dto.ScoreDTO;
import com.mindgames.scoreservice.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
@CrossOrigin(origins = "*")
public class ScoreController {

    @Autowired
    private ScoreService scoreService;

    @PostMapping
    public ResponseEntity<ScoreDTO> createScore(@RequestBody ScoreDTO scoreDTO) {
        try {
            ScoreDTO createdScore = scoreService.createScore(scoreDTO);
            return new ResponseEntity<>(createdScore, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<List<ScoreDTO>> getAllScores() {
        List<ScoreDTO> scores = scoreService.getAllScores();
        return new ResponseEntity<>(scores, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ScoreDTO> getScoreById(@PathVariable Long id) {
        try {
            ScoreDTO score = scoreService.getScoreById(id);
            return new ResponseEntity<>(score, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ScoreDTO>> getScoresByUserId(@PathVariable Long userId) {
        List<ScoreDTO> scores = scoreService.getScoresByUserId(userId);
        return new ResponseEntity<>(scores, HttpStatus.OK);
    }

    @GetMapping("/game/{gameId}")
    public ResponseEntity<List<ScoreDTO>> getScoresByGameId(@PathVariable Long gameId) {
        List<ScoreDTO> scores = scoreService.getScoresByGameId(gameId);
        return new ResponseEntity<>(scores, HttpStatus.OK);
    }

    @GetMapping("/ranking/{gameId}")
    public ResponseEntity<List<ScoreDTO>> getRankingByGameId(@PathVariable Long gameId) {
        List<ScoreDTO> ranking = scoreService.getRankingByGameId(gameId);
        return new ResponseEntity<>(ranking, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScore(@PathVariable Long id) {
        try {
            scoreService.deleteScore(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

