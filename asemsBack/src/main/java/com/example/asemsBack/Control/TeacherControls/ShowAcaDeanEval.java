package com.example.asemsBack.Control.TeacherControls;

import com.example.asemsBack.Dto.AcademicDeanEvalDTO;
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
    private AdEvalRepo academicDeanEvals;

    @Autowired
    private SemesterRepo semesterRepo;

    @GetMapping("/academic-dean-evaluation")
    public ResponseEntity<?> getAcademicDeanEvaluation() {
        try {
            long startTime = System.currentTimeMillis();

            // 1. Get authenticated username
            String username = getAuthenticatedUsername();
            System.out.println("Authentication took: " + (System.currentTimeMillis() - startTime) + "ms");

            // 2. Get active semester
            long semesterTime = System.currentTimeMillis();
            Semester activeSemester = semesterRepo.findByIsActive(true);
            if (activeSemester == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("No active semester found.");
            }
            System.out.println("Semester lookup took: " + (System.currentTimeMillis() - semesterTime) + "ms");

            // 3. Determine active round
            long roundTime = System.currentTimeMillis();
            int activeRound = getActiveRound(activeSemester);
            if (activeRound == 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("No active evaluation round.");
            }
            System.out.println("Round determination took: " + (System.currentTimeMillis() - roundTime) + "ms");

            // 4. Fetch evaluation data using DTO projection
            long queryTime = System.currentTimeMillis();
            AcademicDeanEvalDTO evaluation = academicDeanEvals.findEvaluationDto(
                    username,
                    activeSemester.getId(),
                    activeRound
            );

            // If no evaluation found, return default values
            AcademicDeanEvalDTO response = evaluation != null
                    ? evaluation
                    : new AcademicDeanEvalDTO(new BigDecimal("0.1"), "");

            System.out.println("Evaluation query took: " + (System.currentTimeMillis() - queryTime) + "ms");
            System.out.println("Total endpoint execution: " + (System.currentTimeMillis() - startTime) + "ms");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.err.println("Error in getAcademicDeanEvaluation: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred: " + e.getMessage());
        }
    }

    private String getAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    private int getActiveRound(Semester semester) {
        Date currentDate = new Date();

        if (currentDate.after(semester.getStartof1stRoundEval()) &&
                currentDate.before(semester.getStartof2ndRoundEval())) {
            return 1;
        } else if (currentDate.after(semester.getStartof2ndRoundEval()) &&
                currentDate.before(semester.getEndDate())) {
            return 2;
        }
        return 0;
    }
}