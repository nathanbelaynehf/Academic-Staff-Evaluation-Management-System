package com.example.asemsBack.Dto;

import java.math.BigDecimal;

public class DeptEvalResultDTO {
    private long criteriaId;
    private String criteriaName;
    private BigDecimal score;

    public DeptEvalResultDTO(long criteriaId, String criteriaName, BigDecimal score) {
        this.criteriaId = criteriaId;
        this.criteriaName = criteriaName;
        this.score = score;
    }

    // Getters and Setters
    public long getCriteriaId() {
        return criteriaId;
    }

    public void setCriteriaId(long criteriaId) {
        this.criteriaId = criteriaId;
    }

    public String getCriteriaName() {
        return criteriaName;
    }

    public void setCriteriaName(String criteriaName) {
        this.criteriaName = criteriaName;
    }

    public BigDecimal getScore() {
        return score;
    }

    public void setScore(BigDecimal score) {
        this.score = score;
    }
}