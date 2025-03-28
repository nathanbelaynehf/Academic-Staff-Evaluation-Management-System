package com.example.asemsBack.Control.StudentControls;

import com.example.asemsBack.Dto.EvaluationSubmissionDTO;
import com.example.asemsBack.Model.Criteria;
import com.example.asemsBack.Model.Semester;
import com.example.asemsBack.Repository.CriteriaRepo;
import com.example.asemsBack.Repository.SemesterRepo;
import com.example.asemsBack.Service.StudentEvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/stud")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentEvaluationController {

    @Autowired
    private CriteriaRepo criteriaRepo;

    @Autowired
    StudentEvaluationService studentEvaluationService;

    @Autowired
    SemesterRepo semesterRepo;

    @GetMapping("/criteria")
    public ResponseEntity<?> getStudentCriteria() {
        try {
            List<Criteria> criteria = studentEvaluationService.getStudentCriteria();
            return ResponseEntity.ok(criteria);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    private String getAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return authentication.getName(); // Assumes username is stored in SecurityContext
    }

    @PostMapping("/evalsubmit")
    public ResponseEntity<?> submitEvaluations(@RequestBody List<EvaluationSubmissionDTO> evaluationRequests) {
        String username = getAuthenticatedUsername();
        return studentEvaluationService.submitEvaluations(evaluationRequests, username);
    }


    @GetMapping("/round")
    public int getActiveRound() {
        Semester semester = semesterRepo.findByIsActive(true); // Implement this method in your service
        if (semester == null) {
            throw new RuntimeException("Semester not found");
        }

        Date currentDate = new Date(System.currentTimeMillis());

        if (currentDate.after(semester.getStartof1stRoundEval()) && currentDate.before(semester.getEndof1stRoundEval())) {
            return 1; // First round is active
        } else if (currentDate.after(semester.getStartof2ndRoundEval()) && currentDate.before(semester.getEndof2ndRoundEval())) {
            return 2; // Second round is active
        }

        return 0; // No active round
    }


}
