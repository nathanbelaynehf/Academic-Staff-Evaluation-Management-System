package com.example.asemsBack.Service;

import com.example.asemsBack.Dto.ClassStatisticsDTO;
import com.example.asemsBack.Dto.TotalEvaluationStatsDTO;
import com.example.asemsBack.Model.Class;
import com.example.asemsBack.Model.Student;
import com.example.asemsBack.Repository.ClassRepo;
import com.example.asemsBack.Repository.StudEvalRepository;
import com.example.asemsBack.Repository.StudRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClassStatisticsService {

    private final ClassRepo classRepo;
    private final StudRepo studRepo;
    private final StudEvalRepository studEvalRepository;


    public List<ClassStatisticsDTO> getClassEvaluationStat(long id) {
        List<Class> classes = classRepo.findByDepartments_Id(id);

        return classes.stream()
                .map(this::getClassStatistics)
                .collect(Collectors.toList());
    }


    public ClassStatisticsDTO getClassEvaluationStats(Long classId) {
        Class clazz = classRepo.findById(classId)
                .orElseThrow(() -> new IllegalArgumentException("Class not found with id: " + classId));

        return getClassStatistics(clazz);
    }


    private ClassStatisticsDTO getClassStatistics(Class clazz) {
        Long totalStudents = studRepo.countByClasses_Id(clazz.getId());
        Long evaluatedStudents = studEvalRepository.countByStudent_Classes_Id(clazz.getId());

        return new ClassStatisticsDTO(
                clazz.getId(),
                clazz.getClassName(),
                clazz.getProgram(),
                totalStudents,
                evaluatedStudents
        );
    }


    public List<ClassStatisticsDTO> getDepartmentClassEvaluationStats() {
        List<Class> classes = classRepo.findAll();

        return classes.stream()
                .map(this::getClassStatistics)
                .collect(Collectors.toList());
    }

    public TotalEvaluationStatsDTO getDepartmentEvaluationStats(Long departmentId) {
        // Get all classes in the department
        List<Class> departmentClasses = classRepo.findByDepartments_Id(departmentId);

        // Get all student IDs in these classes
        List<Long> departmentStudentIds = departmentClasses.stream()
                .flatMap(clazz -> studRepo.findByClasses_Id(clazz.getId()).stream())
                .map(Student::getId)
                .distinct()
                .collect(Collectors.toList());

        // Count total students in department
        long totalStudents = departmentStudentIds.size();

        // Count evaluated students in department
        long totalEvaluated = studEvalRepository.countDistinctByStudentIdIn(departmentStudentIds);

        double participationRate = totalStudents > 0
                ? (double) totalEvaluated / totalStudents * 100
                : 0;

        return new TotalEvaluationStatsDTO(
                totalStudents,
                totalEvaluated,
                Math.round(participationRate * 100) / 100.0
        );
    }

}
