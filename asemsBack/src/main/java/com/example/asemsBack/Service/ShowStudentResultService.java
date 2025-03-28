package com.example.asemsBack.Service;

import com.example.asemsBack.Model.Semester;
import com.example.asemsBack.Repository.SemesterRepo;
import com.example.asemsBack.Repository.StudEvalRepository;
import com.example.asemsBack.Repository.TeacherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ShowStudentResultService {
    @Autowired
    private StudEvalRepository studEvalRepository;

    @Autowired
    private TeacherRepo teacherRepository;


    @Autowired
    private SemesterRepo semesterRepository;



    public ResponseEntity<?> getEvaluationResultsForAuthenticatedTeacher() {
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

            // Fetch evaluation results for the authenticated teacher, semester, and round
            List<Object[]> results = studEvalRepository.findEvaluationResultsForTeacherAndSemesterAndRound(
                    username, // Pass the authenticated teacher's username
                    activeSemester.getId(), // Pass semester ID
                    activeRound // Pass active round
            );

            // Create a map to group results by course name and criteria
            Map<String, Map<String, Double>> evaluationResults = new HashMap<>();

            // Process the results
            for (Object[] result : results) {
                String courseName = (String) result[1]; // Course name
                String criteria = (String) result[2]; // Criteria name
                Double avgScore = ((Number) result[3]).doubleValue(); // Average score

                evaluationResults.putIfAbsent(courseName, new HashMap<>());
                evaluationResults.get(courseName).put(criteria, avgScore);
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