package com.example.asemsBack.Control;

public class TeacherDto {
    private long id;
    private String username;  // Assuming teacher has a username field

    // Constructor
    public TeacherDto(long id, String username) {
        this.id = id;
        this.username = username;
    }

    // Getters and setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
