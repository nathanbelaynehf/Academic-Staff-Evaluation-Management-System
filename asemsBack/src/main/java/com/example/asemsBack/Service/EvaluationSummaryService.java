// EvaluationSummaryService.java
package com.example.asemsBack.Service;


import com.example.asemsBack.Dto.DepartmentEvaluationSummaryDTO;
import com.example.asemsBack.Model.Department;
import com.example.asemsBack.Model.Teacher;
import com.example.asemsBack.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EvaluationSummaryService {

    private final DepartmentRepo departmentRepository;
    private final TeacherCourseRepo teacherCourseRepository;
    private final StudEvalRepository studEvalRepository;
    private final DeptEvalRepo deptEvalRepository;
    private final AdEvalRepo academicDeanEvalRepository;

    public List<DepartmentEvaluationSummaryDTO> getDepartmentEvaluationSummaries() {
        return departmentRepository.findAllDepartmentsWithTeachers().stream()
                .map(this::buildDepartmentSummary)
                .collect(Collectors.toList());
    }

    private DepartmentEvaluationSummaryDTO buildDepartmentSummary(Department department) {
        List<Teacher> teachers = departmentRepository.findTeachersByDepartmentId(department.getId());

        // Student Evaluations (via TeacherCourse)
//        double studentAvg = teachers.stream()
//                .flatMap(teacher -> teacherCourseRepository.(teacher).stream())
//                .flatMap(tc -> studEvalRepository.findByTeacherCourse(tc).stream())
//                .mapToDouble(eval -> eval.getEvaluation().getScore().doubleValue())
//                .average()
//                .orElse(0.0);

        // Department Head Evaluations
        double deptHeadAvg = teachers.stream()
                .flatMap(teacher -> deptEvalRepository.findByTeacher(teacher).stream())
                .mapToDouble(eval -> eval.getEvaluation().getScore().doubleValue())
                .average()
                .orElse(0.0);

        // Academic Dean Evaluations
        double deanAvg = teachers.stream()
                .flatMap(teacher -> academicDeanEvalRepository.findByTeacher(teacher).stream())
                .mapToDouble(eval -> eval.getEvaluation().getScore().doubleValue())
                .average()
                .orElse(0.0);

        // Combined average (equally weighted)
        double totalAvg = ( deptHeadAvg + deanAvg) / 3;

        return new DepartmentEvaluationSummaryDTO(
                department.getDepartmentName(),

                round(deptHeadAvg),
                round(deanAvg),
                round(totalAvg)
        );
    }

    private double round(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}