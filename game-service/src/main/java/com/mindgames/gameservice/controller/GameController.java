package com.mindgames.gameservice.controller;

import com.mindgames.gameservice.dto.GameDTO;
import com.mindgames.gameservice.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "*")
public class GameController {

    @Autowired
    private GameService gameService;

    @PostMapping
    public ResponseEntity<GameDTO> createGame(@RequestBody GameDTO gameDTO) {
        try {
            GameDTO createdGame = gameService.createGame(gameDTO);
            return new ResponseEntity<>(createdGame, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<List<GameDTO>> getAllGames() {
        List<GameDTO> games = gameService.getAllGames();
        return new ResponseEntity<>(games, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameDTO> getGameById(@PathVariable Long id) {
        try {
            GameDTO game = gameService.getGameById(id);
            return new ResponseEntity<>(game, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}/exists")
    public ResponseEntity<Boolean> gameExists(@PathVariable Long id) {
        boolean exists = gameService.existsById(id);
        return new ResponseEntity<>(exists, HttpStatus.OK);
    }

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<GameDTO>> getGamesByTipo(@PathVariable String tipo) {
        List<GameDTO> games = gameService.getGamesByTipo(tipo);
        return new ResponseEntity<>(games, HttpStatus.OK);
    }

    @GetMapping("/dificultad/{dificultad}")
    public ResponseEntity<List<GameDTO>> getGamesByDificultad(@PathVariable String dificultad) {
        List<GameDTO> games = gameService.getGamesByDificultad(dificultad);
        return new ResponseEntity<>(games, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GameDTO> updateGame(@PathVariable Long id, @RequestBody GameDTO gameDTO) {
        try {
            GameDTO updatedGame = gameService.updateGame(id, gameDTO);
            return new ResponseEntity<>(updatedGame, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGame(@PathVariable Long id) {
        try {
            gameService.deleteGame(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

