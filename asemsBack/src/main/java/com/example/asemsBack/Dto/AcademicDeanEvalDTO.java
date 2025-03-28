package com.example.asemsBack.Dto;

import java.math.BigDecimal;

public class AcademicDeanEvalDTO {
    private BigDecimal score;
    private String remark;


    // Getters and Setters



    public BigDecimal getScore() {
        return score;
    }



    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
    public AcademicDeanEvalDTO(BigDecimal score, String remark) {
        this.score = score;
        this.remark = remark;
    }

}
