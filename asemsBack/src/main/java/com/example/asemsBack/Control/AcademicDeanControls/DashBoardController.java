package com.example.asemsBack.Control.AcademicDeanControls;

import com.example.asemsBack.Dto.AcademicDeanDataDto;
import com.example.asemsBack.Dto.DepartmentEvaluationSummaryDTO;
import com.example.asemsBack.Model.*;
import com.example.asemsBack.Repository.*;
import com.example.asemsBack.Service.AcademicDeanDataService;
import com.example.asemsBack.Service.DeptEvalService;
import com.example.asemsBack.Service.EvaluationSummaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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
    EvaluationSummaryService evaluationSummaryService;

    @GetMapping("/summary")
    public List<DepartmentEvaluationSummaryDTO> getDepartmentEvaluationSummaries() {
        return evaluationSummaryService.getDepartmentEvaluationSummaries();
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