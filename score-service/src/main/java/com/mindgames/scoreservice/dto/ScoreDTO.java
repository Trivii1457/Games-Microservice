package com.mindgames.scoreservice.dto;

import java.time.LocalDateTime;

public class ScoreDTO {
    private Long id;
    private Long userId;
    private Long gameId;
    private Integer score;
    private Integer duration;
    private LocalDateTime fecha;
    private String username;
    private String gameName;

    // Constructors
    public ScoreDTO() {}

    public ScoreDTO(Long id, Long userId, Long gameId, Integer score, Integer duration, LocalDateTime fecha) {
        this.id = id;
        this.userId = userId;
        this.gameId = gameId;
        this.score = score;
        this.duration = duration;
        this.fecha = fecha;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getGameId() {
        return gameId;
    }

    public void setGameId(Long gameId) {
        this.gameId = gameId;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getGameName() {
        return gameName;
    }

    public void setGameName(String gameName) {
        this.gameName = gameName;
    }
}

