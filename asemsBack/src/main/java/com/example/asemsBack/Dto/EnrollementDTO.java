package com.example.asemsBack.Dto;

public class EnrollementDTO {
    private String courseName;
    private String teacherUsername;
    private long teacherCourseId;


    public long getTeacherCourseId() {
        return teacherCourseId;
    }

    public void setTeacherCourseId(long teacherCourseId) {
        this.teacherCourseId = teacherCourseId;
    }

    public EnrollementDTO(String courseName, String username, long id) {
    this.courseName=courseName;
    this.teacherUsername=username;
    this.teacherCourseId=id;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getTeacherUsername() {
        return teacherUsername;
    }

    public void setTeacherUsername(String teacherUsername) {
        this.teacherUsername = teacherUsername;
    }
}
