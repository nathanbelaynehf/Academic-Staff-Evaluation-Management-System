package com.example.asemsBack.Control.DepartmentHeadControls;


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

            // Fetch all teachers' names (fname and lname) regardless of evaluations
            List<Object[]> teacherNames = studEvalRepository.findTeacherNamesByTeacherIds(teacherIds);

            // Create a map to store fname and lname for each teacher
            Map<String, String> teacherNamesMap = new HashMap<>();
            for (Object[] teacher : teacherNames) {
                String teacherUsername = (String) teacher[0];
                String teacherFname = (String) teacher[1];
                String teacherLname = (String) teacher[2];
                teacherNamesMap.put(teacherUsername, teacherFname + " " + teacherLname);
            }

            // Create a map to group evaluation results
            Map<String, Map<String, Map<String, Double>>> evaluationResults = new HashMap<>();
            for (Object[] result : results) {
                String teacherUsername = (String) result[0];
                String courseName = (String) result[5];
                String criteria = (String) result[4];
                Double avgScore = ((Number) result[6]).doubleValue();

                // Use username as the key
                evaluationResults.putIfAbsent(teacherUsername, new HashMap<>());
                evaluationResults.get(teacherUsername).putIfAbsent(courseName, new HashMap<>());
                evaluationResults.get(teacherUsername).get(courseName).put(criteria, avgScore);
            }

            // Create a response object that includes teacher names and evaluation results
            Map<String, Object> response = new HashMap<>();
            response.put("teacherNames", teacherNamesMap); // Add teacher names to the response
            response.put("evaluationResults", evaluationResults);

            return ResponseEntity.ok(response);
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