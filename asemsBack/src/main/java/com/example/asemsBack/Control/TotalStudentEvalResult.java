package com.example.asemsBack.Control;

import com.example.asemsBack.Model.Semester;
import com.example.asemsBack.Repository.SemesterRepo;
import com.example.asemsBack.Repository.StudEvalRepository;
import com.example.asemsBack.Service.AcademicDeanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<Map<String, Map<String, Map<String, Double>>>> getEvaluationResultsForAllInstructors() {
        // Fetch the active semester
        Semester activeSemester = semesterRepo.findByIsActive(true);
        if (activeSemester == null) {
            throw new RuntimeException("No active semester found.");
        }

        // Determine the active round
        int activeRound = getActiveRound(activeSemester);
        if (activeRound == 0) {
            throw new RuntimeException("No active evaluation round.");
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

            // If the teacher is not already in the map, add them
            evaluationResults.putIfAbsent(teacher, new HashMap<>());

            // If the course is not already in the teacher's map, add it
            evaluationResults.get(teacher).putIfAbsent(courseName, new HashMap<>());

            // Add the criteria and its average score to the course's map
            evaluationResults.get(teacher).get(courseName).put(criteria, avgScore);
        }

        // Return the structured results
        return ResponseEntity.ok(evaluationResults);
    }

    // Helper method to determine the active round
    private int getActiveRound(Semester semester) {
        Date currentDate = new Date(System.currentTimeMillis());

        // Check if the current date is within the first round (inclusive)
        if (!currentDate.before(semester.getStartof1stRoundEval()) && !currentDate.after(semester.getEndof1stRoundEval())) {
            return 1; // First round is active
        }

        // Check if the current date is within the second round (inclusive)
        if (!currentDate.before(semester.getStartof2ndRoundEval()) && !currentDate.after(semester.getEndof2ndRoundEval())) {
            return 2; // Second round is active
        }

        return 0; // No active round
    }
}
