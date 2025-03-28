package com.example.asemsBack.Dto;

public class StudentDTO {
    private  long id;
    private String username;
    private String fname;
    private String lname;

    public StudentDTO(long id, String username, String fname, String lname) {
        this.id = id;
        this.username = username;
        this.fname = fname;
        this.lname = lname;
    }


    public String getFname() {
        return fname;
    }

    public String getLname() {
        return lname;
    }

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
