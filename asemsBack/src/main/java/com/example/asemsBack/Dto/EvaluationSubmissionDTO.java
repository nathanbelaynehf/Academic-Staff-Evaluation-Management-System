package com.example.asemsBack.Dto;

import java.math.BigDecimal;

public class EvaluationSubmissionDTO {
    private BigDecimal score;
    private long id;
    private String remark;
    private long teacherId;

    public long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(long teacherId) {
        this.teacherId = teacherId;
    }

    // Getters and setters
    public BigDecimal getScore() {
        return score;
    }

    public void setScore(BigDecimal score) {
        this.score = score;
    }

    public long getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
    @Override
    public String toString() {
        return "EvaluationSubmissionDTO{" +
                "id=" + id +
                ", score=" + score +
                ", remark='" + remark + '\'' +
                ", teacherId=" + teacherId +
                '}';
    }

}