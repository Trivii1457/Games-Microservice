package com.mindgames.scoreservice.service;

import com.mindgames.scoreservice.dto.GameDTO;
import com.mindgames.scoreservice.dto.ScoreDTO;
import com.mindgames.scoreservice.dto.UserDTO;
import com.mindgames.scoreservice.entity.Score;
import com.mindgames.scoreservice.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${services.user.url}")
    private String userServiceUrl;

    @Value("${services.game.url}")
    private String gameServiceUrl;

    public ScoreDTO createScore(ScoreDTO scoreDTO) {
        // Validar que el usuario existe
        if (!userExists(scoreDTO.getUserId())) {
            throw new RuntimeException("Usuario no encontrado con id: " + scoreDTO.getUserId());
        }

        // Validar que el juego existe
        if (!gameExists(scoreDTO.getGameId())) {
            throw new RuntimeException("Juego no encontrado con id: " + scoreDTO.getGameId());
        }

        Score score = convertToEntity(scoreDTO);
        Score savedScore = scoreRepository.save(score);
        return convertToDTO(savedScore);
    }

    public List<ScoreDTO> getAllScores() {
        return scoreRepository.findAllOrderedByScore().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ScoreDTO getScoreById(Long id) {
        Score score = scoreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Puntaje no encontrado con id: " + id));
        return convertToDTO(score);
    }

    public List<ScoreDTO> getScoresByUserId(Long userId) {
        return scoreRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ScoreDTO> getScoresByGameId(Long gameId) {
        return scoreRepository.findByGameId(gameId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ScoreDTO> getRankingByGameId(Long gameId) {
        return scoreRepository.findTopScoresByGameId(gameId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void deleteScore(Long id) {
        if (!scoreRepository.existsById(id)) {
            throw new RuntimeException("Puntaje no encontrado con id: " + id);
        }
        scoreRepository.deleteById(id);
    }

    private boolean userExists(Long userId) {
        try {
            String url = userServiceUrl + "/api/users/" + userId + "/exists";
            Boolean exists = restTemplate.getForObject(url, Boolean.class);
            return exists != null && exists;
        } catch (Exception e) {
            return false;
        }
    }

    private boolean gameExists(Long gameId) {
        try {
            String url = gameServiceUrl + "/api/games/" + gameId + "/exists";
            Boolean exists = restTemplate.getForObject(url, Boolean.class);
            return exists != null && exists;
        } catch (Exception e) {
            return false;
        }
    }

    private ScoreDTO convertToDTO(Score score) {
        ScoreDTO dto = new ScoreDTO();
        dto.setId(score.getId());
        dto.setUserId(score.getUserId());
        dto.setGameId(score.getGameId());
        dto.setScore(score.getScore());
        dto.setDuration(score.getDuration());
        dto.setFecha(score.getFecha());
        
        // Fetch username
        try {
            String userUrl = userServiceUrl + "/api/users/" + score.getUserId();
            UserDTO user = restTemplate.getForObject(userUrl, UserDTO.class);
            if (user != null) {
                dto.setUsername(user.getUsername());
            }
        } catch (Exception e) {
            dto.setUsername("Unknown");
        }
        
        // Fetch game name
        try {
            String gameUrl = gameServiceUrl + "/api/games/" + score.getGameId();
            GameDTO game = restTemplate.getForObject(gameUrl, GameDTO.class);
            if (game != null) {
                dto.setGameName(game.getNombre());
            }
        } catch (Exception e) {
            dto.setGameName("Unknown");
        }
        
        return dto;
    }

    private Score convertToEntity(ScoreDTO dto) {
        Score score = new Score();
        score.setId(dto.getId());
        score.setUserId(dto.getUserId());
        score.setGameId(dto.getGameId());
        score.setScore(dto.getScore());
        score.setDuration(dto.getDuration());
        return score;
    }
}

