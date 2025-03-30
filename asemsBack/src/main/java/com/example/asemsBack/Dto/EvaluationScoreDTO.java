package com.example.asemsBack.Dto;

import java.math.BigDecimal;

public class EvaluationScoreDTO {
    private BigDecimal overallScore;

    public EvaluationScoreDTO(BigDecimal overallScore) {
        this.overallScore = overallScore;
    }

    public BigDecimal getOverallScore() {
        return overallScore;
    }

    public void setOverallScore(BigDecimal overallScore) {
        this.overallScore = overallScore;
    }
}
