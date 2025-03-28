package com.example.asemsBack.Control.TeacherControls;

import com.example.asemsBack.Dto.AcademicDeanEvalDTO;
import com.example.asemsBack.Model.AcademicDeanEval;
import com.example.asemsBack.Model.Semester;
import com.example.asemsBack.Repository.AdEvalRepo;
import com.example.asemsBack.Repository.SemesterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Date;

@RestController
@RequestMapping("/teach")
@CrossOrigin(origins = "http://localhost:5173")
public class ShowAcaDeanEval {

    @Autowired
    AdEvalRepo academicDeanEvals;

    @Autowired
    SemesterRepo semesterRepo;

    @GetMapping("/academic-dean-evaluation")
    public ResponseEntity<?> getAcademicDeanEvaluation() {
        try {
            // Fetch the authenticated teacher's username
            String username = getAuthenticatedUsername();

            // Fetch the active semester
            Semester activeSemester = semesterRepo.findByIsActive(true);
            if (activeSemester == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("No active semester found.");
            }

            // Determine the active round
            int activeRound = getActiveRound(activeSemester);
            if (activeRound == 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("No active evaluation round.");
            }

            // Fetch the Academic Dean evaluation for the teacher, semester, and round
            AcademicDeanEval academicDeanEval = academicDeanEvals.findByTeacherUsernameAndSemesterAndRound(
                    username, // Pass the authenticated teacher's username
                    activeSemester.getId(), // Pass semester ID
                    activeRound // Pass active round
            );

            // Create a DTO for the response
            AcademicDeanEvalDTO response;
            if (academicDeanEval == null) {
                // If no evaluation is found, return a default DTO with score 0 and empty remark
                response = new AcademicDeanEvalDTO(new BigDecimal("0.1"), "");
            } else {
                // If evaluation is found, populate the DTO with the score and remark
                response = new AcademicDeanEvalDTO(
                        academicDeanEval.getEvaluation().getScore(),
                        academicDeanEval.getEvaluation().getRemark()
                );
            }

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            // Log the exception for debugging
            System.err.println("Error fetching Academic Dean evaluation: " + e.getMessage());
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
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