package com.example.asemsBack.Control.DepartmentHeadControls;

import com.example.asemsBack.Service.DepartmentHeadService;
import com.example.asemsBack.Service.DeptEvalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/dh")
@CrossOrigin(origins = "http://localhost:5173")
public class DeptHeadsEvalResultController {

    @Autowired
    private DeptEvalService deptEvalService;

    @Autowired
    private DepartmentHeadService deptHeadService;

    @Autowired
    private DeptEvalService evaluationService;

    @GetMapping("/teachers/{teacherId}")
    public ResponseEntity<?> getSingleTeacherEvaluation(@PathVariable Long teacherId) {
        try {
            String username = getAuthenticatedUsername();
            Map<String, BigDecimal> evaluation =
                    deptHeadService.getSingleTeacherEvaluation(username, teacherId);
            return ResponseEntity.ok(evaluation);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private String getAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }
        return authentication.getName();
    }
}