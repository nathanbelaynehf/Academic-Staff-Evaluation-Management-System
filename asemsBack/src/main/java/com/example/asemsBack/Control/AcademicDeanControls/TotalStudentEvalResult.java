package com.example.asemsBack.Control.AcademicDeanControls;

import com.example.asemsBack.Model.Semester;
import com.example.asemsBack.Repository.SemesterRepo;
import com.example.asemsBack.Repository.StudEvalRepository;
import com.example.asemsBack.Service.AcademicDeanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/ad")
@CrossOrigin(origins = "http://localhost:5173")
public class TotalStudentEvalResult {

    @Autowired
    StudEvalRepository studEvalRepository;

    @Autowired
    AcademicDeanService academicDeanService;

    @Autowired
    SemesterRepo semesterRepo; // Add SemesterRepo to fetch the active semester

    @GetMapping("/evaluation-results/all")
    public ResponseEntity<?> getEvaluationResultsForAllInstructors() {
        try {
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

            // Fetch evaluation results for all instructors, semester, and round
            List<Object[]> results = studEvalRepository.findEvaluationResultsForAllInstructorsAndSemesterAndRound(
                    activeSemester.getId(), // Pass semester ID
                    activeRound // Pass active round
            );

            // Create a map to group results by teacher, course name, and criteria
            Map<String, Map<String, Map<String, Double>>> evaluationResults = new HashMap<>();

            // Process the results
            for (Object[] result : results) {
                String teacher = (String) result[0]; // Teacher username
                String courseName = (String) result[3]; // Course name
                String criteria = (String) result[2]; // Criteria name
                Double avgScore = ((Number) result[4]).doubleValue(); // Average score

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
    public int getActiveRound(Semester semester) {
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
