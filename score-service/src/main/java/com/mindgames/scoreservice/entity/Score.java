package com.mindgames.scoreservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "scores")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "game_id", nullable = false)
    private Long gameId;

    @Column(nullable = false)
    private Integer score;

    @Column(nullable = false)
    private Integer duration; // en segundos

    @Column(nullable = false)
    private LocalDateTime fecha;

    @PrePersist
    protected void onCreate() {
        fecha = LocalDateTime.now();
    }
}

