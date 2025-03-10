package com.example.asemsBack.Control;

public class StudentDTO {
    private  long id;
    private String username;

    // Constructor
    public StudentDTO(String username) {
        this.username = username;
    }

    public StudentDTO(String username, long id) {
        this.id = id;
        this.username = username;
    }

    // Getter and Setter
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
