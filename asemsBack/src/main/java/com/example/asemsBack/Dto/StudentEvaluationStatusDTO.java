package com.example.asemsBack.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentEvaluationStatusDTO {
    private int totalEnrolled;
    private int totalEvaluated;
    private List<UnevaluatedCourseDTO> unevaluatedCourses;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UnevaluatedCourseDTO {
        private String courseName;
        private String teacherName;
        private long teacherCourseId;
    }
}