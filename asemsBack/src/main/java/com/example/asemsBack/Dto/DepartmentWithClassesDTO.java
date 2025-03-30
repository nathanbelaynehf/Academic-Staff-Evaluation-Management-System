package com.example.asemsBack.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DepartmentWithClassesDTO {
    private Long departmentId;
    private String departmentName;
    private List<ClassDTO> classes;
}
