package com.example.asemsBack.Control;


import com.example.asemsBack.Model.DepartmentHead;
import com.example.asemsBack.Model.Semester;
import com.example.asemsBack.Repository.SemesterRepo;
import com.example.asemsBack.Repository.StudEvalRepository;
import com.example.asemsBack.Service.DepartmentHeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/dh")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentEvalResultController {

    @Autowired
    StudEvalRepository studEvalRepository;

    @Autowired
    DepartmentHeadService departmentHeadService;

    @Autowired
    SemesterRepo semesterRepo; // Add SemesterRepo to fetch the active semester

    private String getAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }

        return ((UserDetails) authentication.getPrincipal()).getUsername();
    }

    @GetMapping("/evaluation-results")
    public ResponseEntity<?> getEvaluationResultsForInstructors(@RequestParam List<Long> teacherIds) {
        try {
            // Get authenticated user
            String username = getAuthenticatedUsername();

            // Fetch department head
            DepartmentHead departmentHead = departmentHeadService.getDepartmentHeadByUsername(username);
            if (departmentHead == null || departmentHead.getDepartment() == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("error", "Department head or department not found"));
            }

            // Fetch the active semester
            Semester activeSemester = semesterRepo.findByIsActive(true);
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

            // Fetch evaluation results
            List<Object[]> results = studEvalRepository.findEvaluationResultsByTeacherIdsAndDepartmentAndSemesterAndRound(
                    teacherIds,
                    departmentHead.getDepartment().getId(),
                    activeSemester.getId(),
                    activeRound
            );

            // Create a map to group results
            Map<String, Map<String, Map<String, Double>>> evaluationResults = new HashMap<>();

            for (Object[] result : results) {
                String teacher = (String) result[0];
                String courseName = (String) result[3];
                String criteria = (String) result[2];
                Double avgScore = ((Number) result[4]).doubleValue();

                evaluationResults.putIfAbsent(teacher, new HashMap<>());
                evaluationResults.get(teacher).putIfAbsent(courseName, new HashMap<>());
                evaluationResults.get(teacher).get(courseName).put(criteria, avgScore);
            }

            return ResponseEntity.ok(evaluationResults);
        } catch (Exception e) {
            // Log the exception for debugging
            System.err.println("Error fetching evaluation results: " + e.getMessage());
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "An unexpected error occurred: " + e.getMessage()));
        }
    }


    // Helper method to determine the active round
    private int getActiveRound(Semester semester) {
        Date currentDate = new Date(System.currentTimeMillis());

        // Check if the current date is within the first round (inclusive)
        if (!currentDate.before(semester.getStartof1stRoundEval()) && !currentDate.after(semester.getStartof2ndRoundEval())) {
            return 1; // First round is active
        }

        // Check if the current date is within the second round (inclusive)
        if (!currentDate.before(semester.getStartof2ndRoundEval()) && !currentDate.after(semester.getEndDate())) {
            return 2; // Second round is active
        }

        return 0; // No active round
    }
}