package com.example.asemsBack.Control;

public class TeacherCourseDTO {

    private String teacherUsername;
    private String courseName;
    private long teacherCourseId;

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
