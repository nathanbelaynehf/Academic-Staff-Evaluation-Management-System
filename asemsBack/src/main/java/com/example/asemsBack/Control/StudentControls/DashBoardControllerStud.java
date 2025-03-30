package com.example.asemsBack.Control.StudentControls;

import com.example.asemsBack.Dto.EvaluationScoreDTO;
import com.example.asemsBack.Dto.RegistrarDataDto;
import com.example.asemsBack.Dto.StudentDataDTO;
import com.example.asemsBack.Dto.StudentEvaluationStatusDTO;
import com.example.asemsBack.Model.Users;
import com.example.asemsBack.Repository.UserRepo;
import com.example.asemsBack.Service.StudentDataService;
import com.example.asemsBack.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/stud")
@CrossOrigin(origins = "http://localhost:5173")
public class DashBoardControllerStud {
    @Autowired
    UserRepo userRepo;

    @Autowired
    StudentDataService studentDataService;

    @Autowired
    StudentService studentService;

    @GetMapping("/profile")
    public StudentDataDTO getAuthenticatedStudentProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users user = userRepo.findByUsername(authentication.getName());

        if (user == null || user.getStudent() == null) {
            throw new RuntimeException("Student not found");
        }

        return studentDataService.getStudentById(user.getStudent().getId());
    }
    @GetMapping("/evaluation-status")
    public ResponseEntity<StudentEvaluationStatusDTO> getStudentEvaluationStatus() {
        return ResponseEntity.ok(studentService.getStudentEvaluationStatus());
    }

    @GetMapping("/averageevaluation")
    public ResponseEntity<EvaluationScoreDTO> GetStudentEverageEvaluation(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users user = userRepo.findByUsername(authentication.getName());

        if (user == null || user.getStudent() == null) {
            throw new RuntimeException("Student not found");
        }
        return ResponseEntity.ok(studentService.calculateEvaluationScore(user.getStudent().getId()));
    }

}