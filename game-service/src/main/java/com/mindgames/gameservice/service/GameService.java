package com.mindgames.gameservice.service;

import com.mindgames.gameservice.dto.GameDTO;
import com.mindgames.gameservice.entity.Game;
import com.mindgames.gameservice.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    public GameDTO createGame(GameDTO gameDTO) {
        Game game = convertToEntity(gameDTO);
        Game savedGame = gameRepository.save(game);
        return convertToDTO(savedGame);
    }

    public List<GameDTO> getAllGames() {
        return gameRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public GameDTO getGameById(Long id) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Juego no encontrado con id: " + id));
        return convertToDTO(game);
    }

    public List<GameDTO> getGamesByTipo(String tipo) {
        return gameRepository.findByTipo(tipo).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<GameDTO> getGamesByDificultad(String dificultad) {
        return gameRepository.findByDificultad(dificultad).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public GameDTO updateGame(Long id, GameDTO gameDTO) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Juego no encontrado con id: " + id));

        game.setNombre(gameDTO.getNombre());
        game.setTipo(gameDTO.getTipo());
        game.setDificultad(gameDTO.getDificultad());
        game.setDescripcion(gameDTO.getDescripcion());

        Game updatedGame = gameRepository.save(game);
        return convertToDTO(updatedGame);
    }

    public void deleteGame(Long id) {
        if (!gameRepository.existsById(id)) {
            throw new RuntimeException("Juego no encontrado con id: " + id);
        }
        gameRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return gameRepository.existsById(id);
    }

    private GameDTO convertToDTO(Game game) {
        GameDTO dto = new GameDTO();
        dto.setId(game.getId());
        dto.setNombre(game.getNombre());
        dto.setTipo(game.getTipo());
        dto.setDificultad(game.getDificultad());
        dto.setDescripcion(game.getDescripcion());
        return dto;
    }

    private Game convertToEntity(GameDTO dto) {
        Game game = new Game();
        game.setId(dto.getId());
        game.setNombre(dto.getNombre());
        game.setTipo(dto.getTipo());
        game.setDificultad(dto.getDificultad());
        game.setDescripcion(dto.getDescripcion());
        return game;
    }
}

