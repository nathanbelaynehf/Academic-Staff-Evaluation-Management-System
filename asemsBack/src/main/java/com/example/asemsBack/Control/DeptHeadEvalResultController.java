package com.example.asemsBack.Control;

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
    DeptEvalRepo deptEvalRepo;

    @Autowired
    DeptEvalService deptEvalService;

    @GetMapping("/department-evaluations/{teacherId}")
    public ResponseEntity<Map<String, Map<String, Double>>> getDepartmentHeadEvaluations(@PathVariable Long teacherId) {
        // Validate teacherId
//        if (teacherId == null || teacherId <= 0) {
//            return ResponseEntity.badRequest().body(null); // Return 400 Bad Request for invalid teacherId
//        }

        // Fetch the active semester
        Semester activeSemester = deptEvalService.getActiveSemester();

        // Determine the active round
        int activeRound = deptEvalService.getActiveRound(activeSemester);

//        if (activeRound == 0) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // No active round
//        }

        // Fetch department head evaluations for the specified teacher, semester, and round
        List<Object[]> results = deptEvalRepo.findDepartmentHeadEvaluationsByTeacherIdAndSemesterAndRound(
                teacherId, activeSemester.getId(), activeRound);

        // If no results are found, return a 404 Not Found response
//        if (results.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }

        // Create a map to group results by department and criteria
        Map<String, Map<String, Double>> departmentEvaluations = new HashMap<>();

        // Process the results
        for (Object[] result : results) {
            String department = (String) result[0]; // Department name
            String criteria = (String) result[1]; // Criteria name
            Double avgScore = ((Number) result[2]).doubleValue(); // Average score

            // If the department is not already in the map, add it
            departmentEvaluations.putIfAbsent(department, new HashMap<>());

            // Add the criteria and its average score to the department's map
            departmentEvaluations.get(department).put(criteria, avgScore);
        }

        // Return the structured results
        return ResponseEntity.ok(departmentEvaluations);
    }

}
