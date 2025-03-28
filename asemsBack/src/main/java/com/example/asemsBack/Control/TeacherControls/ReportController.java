package com.example.asemsBack.Control.TeacherControls;

import com.example.asemsBack.Dto.CourseReportAverageDTO;
import com.example.asemsBack.Model.Report;
import com.example.asemsBack.Model.Teacher;
import com.example.asemsBack.Model.Users;
import com.example.asemsBack.Repository.UserRepo;
import com.example.asemsBack.Service.ReportEvalService;
import com.example.asemsBack.Service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/teach")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    @Autowired
    ReportService reportService;

    @Autowired
    ReportEvalService reportEvalService;

    @Autowired
    UserRepo userRepo;

    @PostMapping("/submit/{teacherCourseId}")
    public ResponseEntity<?> submitReport(@PathVariable Long teacherCourseId, @RequestBody ArrayList<Report> reports) {

        return ResponseEntity.ok( reportService.submitReport(teacherCourseId, reports));
    }

    private String getAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName(); // Assumes username is stored in SecurityContext
    }

    public Teacher getTeacherByUserName(String username) {
        Users user = userRepo.findByUsername(username);

        if (user != null && user.getTeacher() != null) {
            return user.getTeacher();  // Return the DepartmentHead associated with the user
        }

        return null;  // Return null if no department head is found
    }

    @GetMapping("/teacherReportAverages")
    public List<Map<String, List<CourseReportAverageDTO>>> getTeacherReportAverages() {
        String username=getAuthenticatedUsername();
        Teacher teacher=getTeacherByUserName(username);
         long teacherId=teacher.getId();
        return reportEvalService.getAverageEvaluationScoresForTeacher(teacherId);
    }
}