package com.example.asemsBack.Service;

import com.example.asemsBack.Model.Semester;
import com.example.asemsBack.Repository.DeptEvalRepo;
import com.example.asemsBack.Repository.SemesterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ShowDepartmentResultService {

    @Autowired
    private DeptEvalRepo deptEvalRepository;

    @Autowired
    private SemesterRepo semesterRepository;

    public ResponseEntity<?> getDepartmentEvaluationsForAuthenticatedTeacher() {
        try {
            // Fetch the authenticated username
            String username = getAuthenticatedUsername();

            // Fetch the active semester
            Semester activeSemester = semesterRepository.findByIsActive(true);
            if (activeSemester == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Collections.singletonMap("error", "No active semester found."));
            }

            // Determine the active round
            int activeRound = getActiveRound(activeSemester);
            if (activeRound == 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Collections.singletonMap("error", "No active evaluation round."));
            }

            // Fetch department evaluations for the authenticated teacher, semester, and round
            List<Object[]> results = deptEvalRepository.findDepartmentEvaluationsForTeacherAndSemesterAndRound(
                    username, // Pass the authenticated teacher's username
                    activeSemester.getId(), // Pass semester ID
                    activeRound // Pass active round
            );

            // Create a map to group results by department and criteria
            Map<String, Map<String, Double>> departmentEvaluations = new HashMap<>();

            // Process the results
            for (Object[] result : results) {
                String departmentName = (String) result[0]; // Department name
                String criteriaName = (String) result[1]; // Criteria name
                Double score = ((Number) result[2]).doubleValue(); // Score

                departmentEvaluations.putIfAbsent(departmentName, new HashMap<>());
                departmentEvaluations.get(departmentName).put(criteriaName, score);
            }

            return ResponseEntity.ok(departmentEvaluations);
        } catch (Exception e) {
            // Log the exception for debugging
            System.err.println("Error fetching department evaluations: " + e.getMessage());
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "An unexpected error occurred: " + e.getMessage()));
        }
    }

    private String getAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName(); // Assumes username is stored in SecurityContext
    }

    private int getActiveRound(Semester semester) {
        Date currentDate = new Date(System.currentTimeMillis());

        if (currentDate.after(semester.getStartof1stRoundEval()) && currentDate.before(semester.getStartof2ndRoundEval())) {
            return 1; // First round is active
        } else if (currentDate.after(semester.getStartof2ndRoundEval()) && currentDate.before(semester.getEndDate())) {
            return 2; // Second round is active
        } else {
            return 0; // No active round
        }
    }
}