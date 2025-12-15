package com.mindgames.scoreservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScoreDTO {
    private Long id;
    private Long userId;
    private Long gameId;
    private Integer score;
    private Integer duration;
    private LocalDateTime fecha;
}

