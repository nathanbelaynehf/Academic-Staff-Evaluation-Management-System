package com.example.asemsBack.Dto;

public class DepartmentHeadDto {

    private long id;
    private String fname;
    private String lname;
    private String username;
    private String departmentName;

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

    public String getDepartmentName() {
        return departmentName;
    }

    public DepartmentHeadDto(long id, String fname, String lname, String username, String departmentName) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.username = username;
        this.departmentName = departmentName;
    }
}