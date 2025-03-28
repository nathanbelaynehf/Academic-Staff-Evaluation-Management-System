package com.example.asemsBack.Dto;

public class RegistrarDto {
    private long id;
    private String fname;
    private String lname;
    private String username;

    public long getId() {
        return id;
    }

    public String getFname() {
        return fname;
    }

    public String getLname() {
        return lname;
    }

    public String getUsername() {
        return username;
    }

    public RegistrarDto(long id, String fname, String lname, String username) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.username = username;
    }
}
