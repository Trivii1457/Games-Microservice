package com.mindgames.userservice.dto;

import java.time.LocalDateTime;

public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String password;
    private LocalDateTime fechaRegistro;

    // Constructors
    public UserDTO() {}

    public UserDTO(Long id, String username, String email, String password, LocalDateTime fechaRegistro) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.fechaRegistro = fechaRegistro;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }
}

