package com.example.asemsBack.Dto;

public class TeacherCourseDTO {

    private String teacherUsername;
    private String courseName;
    private long teacherCourseId;
    private String fname;
    private String lname;

    public TeacherCourseDTO(String teacherUsername, String courseName,  String fname, String lname,long teacherCourseId) {
        this.teacherUsername = teacherUsername;
        this.courseName = courseName;
        this.fname = fname;
        this.lname = lname;
        this.teacherCourseId=teacherCourseId;
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

    public long getTeacherCourseId() {
        return teacherCourseId;
    }

    public void setTeacherCourseId(long teacherCourseId) {
        this.teacherCourseId = teacherCourseId;
    }

    public TeacherCourseDTO(String username, String courseName) {
        this.teacherUsername = username;
        this.courseName = courseName;
    }

    public TeacherCourseDTO(String username, String courseName, Long teacherCouseId) {
        this.teacherUsername = username;
        this.courseName = courseName;
        this.teacherCourseId = teacherCouseId;
    }

    public String getTeacherUsername() {
        return teacherUsername;
    }

    public void setTeacherUsername(String teacherUsername) {
        this.teacherUsername = teacherUsername;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }
}
