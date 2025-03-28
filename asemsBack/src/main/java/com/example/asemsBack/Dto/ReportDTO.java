package com.example.asemsBack.Dto;

import java.time.LocalDateTime;

public class ReportDTO {
    private Long id;
    private String topicCovered;
    private String styleOfTeaching;
    private LocalDateTime submissionDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    // Getters and Setters
}