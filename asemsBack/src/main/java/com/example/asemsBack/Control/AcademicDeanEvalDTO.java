package com.example.asemsBack.Control;

public class AcademicDeanEvalDTO {
    private int score;
    private String remark;

    // Getters and Setters



    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
    public AcademicDeanEvalDTO(int score, String remark) {
        this.score = score;
        this.remark = remark;
    }

}
