package com.example.asemsBack.Dto;

public class AcademicDeanDto {
    private long id;
    private String fname;
    private String lname;
    private String username;

    public AcademicDeanDto(long id, String fname, String lname,String username ) {
        this.username = username;
        this.lname = lname;
        this.fname = fname;
        this.id = id;
    }

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
}
