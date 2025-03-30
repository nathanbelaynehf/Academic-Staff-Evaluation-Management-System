package com.example.asemsBack.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClassDTO {
    private Long classId;
    private String className;
    private Long studentCount;
    private String program;
}
