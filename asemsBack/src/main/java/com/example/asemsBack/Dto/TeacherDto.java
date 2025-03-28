package com.example.asemsBack.Dto;

public class TeacherDto {
    private long id;
    private String username;
    private String fname;
    private String lname;

    public TeacherDto(long id, String username, String fname, String lname) {
        this.id = id;
        this.username = username;
        this.fname = fname;
        this.lname = lname;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    // Assuming teacher has a username field

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
