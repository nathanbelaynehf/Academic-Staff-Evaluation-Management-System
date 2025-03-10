package com.example.asemsBack.Control;

import com.example.asemsBack.Model.Department;

import java.util.List;
import java.util.stream.Collectors;

public class Mapper {

    public static DepartmentDto toDepartmentDto(Department department) {
        List<TeacherDto> teacherDtos = department.getDepartmentTeachers().stream()
                .map(departmentTeacher -> new TeacherDto(
                        departmentTeacher.getTeacher().getId(),
                        departmentTeacher.getTeacher().getUsername() // assuming "username" is a field in Teacher
                ))
                .collect(Collectors.toList());

        return new DepartmentDto(
                department.getId(),
                department.getDepartmentName(),
                department.getTotalYear(),
                teacherDtos
        );
    }
}

