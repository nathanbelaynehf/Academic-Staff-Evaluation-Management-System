package com.example.asemsBack.Control.StudentControls;

import com.example.asemsBack.Model.Evaluation;
import com.example.asemsBack.Model.Report;
import com.example.asemsBack.Model.Semester;
import com.example.asemsBack.Repository.ReportRepo;
import com.example.asemsBack.Repository.SemesterRepo;
import com.example.asemsBack.Service.ReportEvalService;
import com.example.asemsBack.Service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/stud")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportEvalContoller {

    @Autowired
    ReportService reportService;

    @Autowired
    ReportEvalService reportEvalService;

    @Autowired
    SemesterRepo semesterRepo;

    @Autowired
    ReportRepo reportRepo;


    @GetMapping("/report/{teacherCourseId}")
    public ResponseEntity<?> getReportsWithinLastWeek(@PathVariable Long teacherCourseId) {
        return reportService.getReportsWithinLastWeek(teacherCourseId);
    }



    @PostMapping("/evaluate/{teacherCourseId}")
    public ResponseEntity<?> evaluateReport(@PathVariable Long teacherCourseId, @RequestBody List<Map<String, String>> evaluations) {
        List<Evaluation> evaluationList = new ArrayList<>();

        for (Map<String, String> eval : evaluations) {
            Evaluation evaluation = new Evaluation();

            Optional<Report> optionalReport = reportRepo.findById(Long.parseLong(eval.get("reportId")));
            if (optionalReport.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Report with ID " + eval.get("reportId") + " not found.");
            }
            Report report = optionalReport.get();

            // Assuming Evaluation has fields score (int) and comments (String)
            evaluation.setScore(BigDecimal.valueOf(Integer.parseInt(eval.get("score")))); // Convert score from String to int
            evaluation.setRemark(eval.get("remark"));
            evaluation.setSemester(getActiveSemester());
            reportEvalService.evaluateReport(teacherCourseId, evaluation,report);

        }

        // Pass the list of Evaluation objects to the service
        return ResponseEntity.ok("All evaluations submitted successfully.");

    }


    public Semester getActiveSemester() {
        return semesterRepo.findByIsActive(true);

    }
}