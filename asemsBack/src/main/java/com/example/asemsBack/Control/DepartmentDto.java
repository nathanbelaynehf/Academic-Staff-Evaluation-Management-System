package com.example.asemsBack.Control;

import java.util.List;

public class DepartmentDto {
    private long id;
    private String departmentName;
    private int totalYear;
    private List<TeacherDto> teachers;

    // Constructor
    public DepartmentDto(long id, String departmentName, int totalYear, List<TeacherDto> teachers) {
        this.id = id;
        this.departmentName = departmentName;
        this.totalYear = totalYear;
        this.teachers = teachers;
    }

    // Getters and setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public int getTotalYear() {
        return totalYear;
    }

    public void setTotalYear(int totalYear) {
        this.totalYear = totalYear;
    }

    public List<TeacherDto> getTeachers() {
        return teachers;
    }

    public void setTeachers(List<TeacherDto> teachers) {
        this.teachers = teachers;
    }
}

