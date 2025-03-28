package com.example.asemsBack.Control.AcademicDeanControls;

import com.example.asemsBack.Model.Semester;
import com.example.asemsBack.Repository.DeptEvalRepo;
import com.example.asemsBack.Service.DeptEvalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ad")
@CrossOrigin(origins = "http://localhost:5173")
public class DeptHeadEvalResultController {

    @Autowired
    private DeptEvalRepo deptEvalRepo;

    @Autowired
    private DeptEvalService deptEvalService;

    @GetMapping("/department-evaluations/{teacherId}")
    public ResponseEntity<?> getDepartmentHeadEvaluations(@PathVariable Long teacherId) {
        try {
            if (teacherId == null || teacherId <= 0) {
                return ResponseEntity.badRequest().body("Invalid teacher ID.");
            }

            Semester activeSemester = deptEvalService.getActiveSemester();
            if (activeSemester == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No active semester found.");
            }

            int activeRound = deptEvalService.getActiveRound(activeSemester);
            if (activeRound == 0) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No active evaluation round found.");
            }

            List<Object[]> results = deptEvalRepo.findDepartmentHeadEvaluationsByTeacherIdAndSemesterAndRound(
                    teacherId, activeSemester.getId(), activeRound);

//            if (results == null || results.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No evaluation data found for the specified teacher.");
//            }

            Map<String, Map<String, Double>> departmentEvaluations = new HashMap<>();

            for (Object[] result : results) {
                String department = (String) result[0];
                String criteria = (String) result[1];
                Double avgScore = ((Number) result[2]).doubleValue();

                departmentEvaluations.putIfAbsent(department, new HashMap<>());
                departmentEvaluations.get(department).put(criteria, avgScore);
            }

            return ResponseEntity.ok(departmentEvaluations);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the request: " + e.getMessage());
        }
    }
}
