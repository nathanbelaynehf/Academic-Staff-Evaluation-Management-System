package com.example.asemsBack.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TotalEvaluationStatsDTO {
    private long totalStudents;
    private long totalEvaluated;
    private double participationRate;
}