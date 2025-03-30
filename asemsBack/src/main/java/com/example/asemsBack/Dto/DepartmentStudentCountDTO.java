package com.example.asemsBack.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DepartmentStudentCountDTO {
    private Long departmentId;
    private String departmentName;
    private Long studentCount;

    public DepartmentStudentCountDTO(Long departmentId, String departmentName, Long studentCount) {
        this.departmentId = departmentId;
        this.departmentName = departmentName;
        this.studentCount = studentCount;
    }
}