package com.example.asemsBack.Dto;

import java.time.LocalDateTime;

public class CourseReportAverageDTO {
    private Long courseId;
    private String courseName;
    private Long reportId;
    private String topicCovered;
    private String styleOfTeaching;
    private LocalDateTime submissionDate;
    private double averageScore;

    // Constructor for query result mapping
    public CourseReportAverageDTO(Long courseId, String courseName, Long reportId, String topicCovered, String styleOfTeaching, LocalDateTime submissionDate, Double averageScore) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.reportId = reportId;
        this.topicCovered = topicCovered;
        this.styleOfTeaching = styleOfTeaching;
        this.submissionDate = submissionDate;
        this.averageScore = averageScore != null ? averageScore : 0.0;
    }

    // Getters and Setters
    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public Long getReportId() {
        return reportId;
    }

    public void setReportId(Long reportId) {
        this.reportId = reportId;
    }

    public String getTopicCovered() {
        return topicCovered;
    }

    public void setTopicCovered(String topicCovered) {
        this.topicCovered = topicCovered;
    }

    public String getStyleOfTeaching() {
        return styleOfTeaching;
    }

    public void setStyleOfTeaching(String styleOfTeaching) {
        this.styleOfTeaching = styleOfTeaching;
    }

    public LocalDateTime getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(LocalDateTime submissionDate) {
        this.submissionDate = submissionDate;
    }

    public double getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(double averageScore) {
        this.averageScore = averageScore;
    }
}