package com.example.asemsBack.Service;

import com.example.asemsBack.Dto.*;
import com.example.asemsBack.Model.Department;
import com.example.asemsBack.Model.Semester;
import com.example.asemsBack.Model.Teacher;
import com.example.asemsBack.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepo departmentRepo;

    @Autowired
    private SemesterRepo semesterRepo;

    @Autowired
    private DeptEvalRepo deptEvalRepo;

    @Autowired
    private AdEvalRepo academicDeanEvalRepo;

    @Autowired
    private DeptTeachRepo departmentTeacherRepo;

    @Autowired
    private TeacherRepo teacherRepo;

    @Autowired
    private StudEvalRepository studEvalRepository;

    @Autowired
    StudRepo studRepo;



    public List<DepartmentEvaluationSummaryDTO> getDepartmentEvaluationSummaries() {
        try {
            Semester activeSemester = semesterRepo.findByIsActive(true);
            if (activeSemester == null) {
                throw new RuntimeException("No active semester found");
            }

            int activeRound = getActiveRound(activeSemester);
            if (activeRound == 0) {
                throw new RuntimeException("No active evaluation round");
            }

            return departmentRepo.findAll().stream()
                    .map(dept -> {
                        List<Teacher> teachers = departmentTeacherRepo.findTeachersByDepartmentId(dept.getId());
                        if (teachers.isEmpty()) return null;

                        return buildDepartmentSummary(dept, teachers, activeSemester.getId(), activeRound);
                    })
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error fetching department evaluations: " + e.getMessage());
        }
    }

    private DepartmentEvaluationSummaryDTO buildDepartmentSummary(Department department,
                                                                  List<Teacher> teachers,
                                                                  Long semesterId,
                                                                  int round) {
        // Student evaluations (sum criteria per student, then average)
        Double studentAvg = calculateStudentEvaluationAverage(teachers, semesterId, round);

        // Department head evaluations (sum criteria per evaluation, then average)
        Double deptHeadAvg = calculateDeptHeadEvaluationAverage(teachers, semesterId);

        // Academic dean evaluations
        Double academicDeanAvg = calculateAcademicDeanAverage(teachers);

        // Combined average (weighted equally)
        Double combinedAvg = calculateWeightedCombinedAverage(
                studentAvg,
                deptHeadAvg,
                academicDeanAvg
        );

        return new DepartmentEvaluationSummaryDTO(
                department.getDepartmentName(),
                studentAvg != null ? roundToTwoDecimals(studentAvg) : 0,
                deptHeadAvg != null ? roundToTwoDecimals(deptHeadAvg) : 0,
                academicDeanAvg != null ? roundToTwoDecimals(academicDeanAvg) : 0,
                combinedAvg != null ? roundToTwoDecimals(combinedAvg) : 0
        );
    }

    private Double calculateStudentEvaluationAverage(List<Teacher> teachers, Long semesterId, int round) {
        List<Double> studentTotalScores = new ArrayList<>();

        for (Teacher teacher : teachers) {
            // Get all student evaluations for this teacher (already summed by student)
            List<Object[]> studentEvaluationSums = studEvalRepository.findStudentEvaluationSumsByTeacher(
                    teacher.getId(), semesterId, round);

            // Extract the summed scores
            for (Object[] sum : studentEvaluationSums) {
                studentTotalScores.add(((Number)sum[1]).doubleValue());
            }
        }

        return studentTotalScores.isEmpty() ? null :
                studentTotalScores.stream().mapToDouble(Double::doubleValue).average().orElse(0);
    }

    private Double calculateDeptHeadEvaluationAverage(List<Teacher> teachers, Long semesterId) {
        List<Double> deptHeadTotalScores = new ArrayList<>();

        for (Teacher teacher : teachers) {
            // Get all department head evaluations for this teacher (already summed by evaluator)
            List<Object[]> deptHeadEvaluationSums = deptEvalRepo.findDeptHeadEvaluationSumsByTeacher(
                    teacher.getId(), semesterId);

            // Extract the summed scores
            for (Object[] sum : deptHeadEvaluationSums) {
                deptHeadTotalScores.add(((Number)sum[1]).doubleValue());
            }
        }

        return deptHeadTotalScores.isEmpty() ? null :
                deptHeadTotalScores.stream().mapToDouble(Double::doubleValue).average().orElse(0);
    }

    private Double calculateAcademicDeanAverage(List<Teacher> teachers) {
        List<Double> deanScores = new ArrayList<>();
        for (Teacher teacher : teachers) {
            List<AcademicDeanEvalDTO> evaluations = academicDeanEvalRepo
                    .findScoreAndRemarkByTeacherId(teacher.getId());
            if (!evaluations.isEmpty()) {
                evaluations.stream()
                        .mapToDouble(dto -> dto.getScore().doubleValue())
                        .forEach(deanScores::add);
            }
        }
        return deanScores.isEmpty() ? null :
                deanScores.stream().mapToDouble(Double::doubleValue).average().orElse(0);
    }

    private Double calculateWeightedCombinedAverage(Double studentAvg, Double deptHeadAvg, Double academicDeanAvg) {

        double sum = 0;

        if (studentAvg != null && studentAvg > 0) {
            sum += studentAvg;

        }
        if (deptHeadAvg != null && deptHeadAvg > 0) {
            sum += deptHeadAvg;

        }
        if (academicDeanAvg != null && academicDeanAvg > 0) {
            sum += academicDeanAvg;

        }

        return  sum;
    }

    private double roundToTwoDecimals(double value) {
        return Math.round(value * 100) / 100.0;
    }

    private int getActiveRound(Semester semester) {
        Date currentDate = new Date();
        if (!currentDate.before(semester.getStartof1stRoundEval()) &&
                !currentDate.after(semester.getStartof2ndRoundEval())) {
            return 1;
        }
        if (!currentDate.before(semester.getStartof2ndRoundEval()) &&
                !currentDate.after(semester.getEndDate())) {
            return 2;
        }
        return 0;
    }

    public void addDepartment(Department department) {
        departmentRepo.save(department);
    }

    public List<DepartmentDto> getAllDepartmentsWithTeachers() {
        return departmentRepo.findAll().stream()
                .map(Mapper::toDepartmentDto)
                .collect(Collectors.toList());
    }



    public List<DepartmentStudentCountDTO> getDepartmentStudentCounts() {
        return departmentRepo.findAllDepartmentStudentCounts();
    }

    public List<DepartmentWithClassesDTO> getDepartmentHierarchy() {
        List<Department> departments = departmentRepo.findAllDepartments();

        return departments.stream()
                .map(d -> new DepartmentWithClassesDTO(
                        d.getId(),
                        d.getDepartmentName(),
                        departmentRepo.findClassCountsByDepartmentId(d.getId())
                ))
                .collect(Collectors.toList());
    }
}