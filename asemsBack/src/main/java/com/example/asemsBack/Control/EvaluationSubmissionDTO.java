package com.example.asemsBack.Control;

import java.util.List;

public class EvaluationSubmissionDTO {
    private int score;
    private int id;
    private String remark;
    private long teacherId;

    public long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(long teacherId) {
        this.teacherId = teacherId;
    }

    // Getters and setters
    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getId() {
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