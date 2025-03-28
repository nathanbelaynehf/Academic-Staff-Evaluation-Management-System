package com.example.asemsBack.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentEvaluationSummaryDTO {
    private String departmentName;
//    private double avgStudentEvaluation;
    private double avgDeptHeadEvaluation;
    private double avgAcademicDeanEvaluation;
    private double totalCombinedAverage;
}
