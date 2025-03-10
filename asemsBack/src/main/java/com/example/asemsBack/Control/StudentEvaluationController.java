package com.example.asemsBack.Control;

import com.example.asemsBack.Model.Criteria;
import com.example.asemsBack.Repository.CriteriaRepo;
import com.example.asemsBack.Service.StudentEvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stud")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentEvaluationController {

    @Autowired
    private CriteriaRepo criteriaRepo;

    @Autowired
    StudentEvaluationService studentEvaluationService;

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
        evaluationRequests.removeIf(e -> e.getId() == 0 || e.getScore() == 0 || e.getRemark() == null || e.getRemark().isEmpty());
        String username = getAuthenticatedUsername();
        return studentEvaluationService.submitEvaluations(evaluationRequests, username);
    }

}
