package com.example.asemsBack.Control.AcademicDeanControls;

import com.example.asemsBack.Dto.AcademicDeanDataDto;
import com.example.asemsBack.Dto.DepartmentEvaluationSummaryDTO;
import com.example.asemsBack.Model.*;
import com.example.asemsBack.Repository.*;
import com.example.asemsBack.Service.AcademicDeanDataService;
import com.example.asemsBack.Service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;


@RestController
@RequestMapping("/ad")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class DashBoardController {

    @Autowired
    UserRepo usersRepository;

    @Autowired
    AcademicDeanDataService academicDeanDataService;

   @Autowired
    DepartmentService departmentService;

    @GetMapping("/summary")
    public ResponseEntity<?> getDepartmentEvaluationSummaries() {
        try {
            List<DepartmentEvaluationSummaryDTO> results = departmentService.getDepartmentEvaluationSummaries();
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", e.getMessage()));
        }
    }


    @GetMapping("/profile")
    public AcademicDeanDataDto getAuthenticatedAcademicDeanProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users user = usersRepository.findByUsername(authentication.getName());

        if (user == null || user.getAcademicDean() == null) {
            throw new RuntimeException("Academic Dean not found");
        }

        return academicDeanDataService.getAcademicDeanById(user.getAcademicDean().getId());
    }
}