package com.mindgames.gameservice.dto;

public class GameDTO {
    private Long id;
    private String nombre;
    private String tipo;
    private String dificultad;
    private String descripcion;

    // Constructors
    public GameDTO() {}

    public GameDTO(Long id, String nombre, String tipo, String dificultad, String descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.dificultad = dificultad;
        this.descripcion = descripcion;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getDificultad() {
        return dificultad;
    }

    public void setDificultad(String dificultad) {
        this.dificultad = dificultad;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}

