package com.example.asemsBack.Service;

import com.example.asemsBack.Dto.CourseReportAverageDTO;
import com.example.asemsBack.Model.*;
import com.example.asemsBack.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReportEvalService {
    @Autowired
   ReportRepo reportRepository;


    @Autowired
    StudReportEvalRepo studReportEvalRepo;

    @Autowired
    EvaluationRepository evaluationRepository;
    
    @Autowired
    UserRepo userRepo;

    @Autowired
    SemesterRepo semesterRepo;

    @Autowired
    ReportEvaluationRepo reportEvaluationRepo;

    public ResponseEntity<?> evaluateReport(Long teacherCourseId, Evaluation evaluation,Report report) {

        LocalDateTime oneWeekAgo = LocalDateTime.now().minusWeeks(1);

        // Fetch the latest report for the teacherCourseId
        List<Report> latestReport = reportRepository.findByTeacherCourseIdAndSubmissionDateWithinLastWeek(teacherCourseId,oneWeekAgo);

        if (latestReport.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No report found for evaluation.");
        }



        // Check if the current date is within 7 days of the submission date
//        LocalDateTime evaluationDeadline = latestReport.getSubmissionDate().plusDays(7);
//        if (LocalDateTime.now().isAfter(evaluationDeadline)) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Evaluation period has ended.");
//        }

        // Check if the student has already evaluated this report

        String username = getAuthenticatedUsername();
        Student student = getStudentByUsername(username);
        long studentId=student.getId();
//        Optional<StudReportEval> existingEvaluation = studReportEvalRepo.findByStudentIdAndReportId(studentId, latestReport.getId());
//        if (existingEvaluation.isPresent()) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You have already evaluated this report.");
//        }


        // Create a new evaluation
        Evaluation savedEvaluation = evaluationRepository.save(evaluation);

        // Link the evaluation to the student and report
        StudReportEval studReportEval = new StudReportEval();
        studReportEval.setEvaluation(savedEvaluation);

        studReportEval.setStudent(student); // Assuming you have a Student constructor with ID

        studReportEvalRepo.save(studReportEval);
        ReportEvaluation reportEvaluation=new ReportEvaluation();
        reportEvaluation.setReport(report);
        reportEvaluation.setStudReportEval(studReportEval);
        reportEvaluationRepo.save(reportEvaluation);

        return ResponseEntity.ok("Evaluation submitted successfully.");
    }

    public Student getStudentByUsername(String username) {
        Users user = userRepo.findByUsername(username);

        if (user != null && user.getStudent() != null) {
            return user.getStudent();  // Return the DepartmentHead associated with the user
        }

        return null;  // Return null if no department head is found
    }

    private String getAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }

        return ((UserDetails) authentication.getPrincipal()).getUsername();
    }

    public List<Map<String, List<CourseReportAverageDTO>>> getAverageEvaluationScoresForTeacher(Long teacherId) {
        // Step 1: Find the active semester
        Long semesterId = semesterRepo.findByIsActive(true).getId();


        // Step 2: Fetch the flat list of reports with average scores
        List<CourseReportAverageDTO> flatData = reportEvaluationRepo
                .findAverageEvaluationScoresByTeacherIdAndSemesterId(teacherId, semesterId);

        // Step 3: Group the data by course name
        Map<String, List<CourseReportAverageDTO>> groupedData = flatData.stream()
                .collect(Collectors.groupingBy(CourseReportAverageDTO::getCourseName));

        // Step 4: Transform into the desired structure
        List<Map<String, List<CourseReportAverageDTO>>> result = new ArrayList<>();
        for (Map.Entry<String, List<CourseReportAverageDTO>> entry : groupedData.entrySet()) {
            String courseName = entry.getKey();
            List<CourseReportAverageDTO> reports = entry.getValue();

            Map<String, List<CourseReportAverageDTO>> courseMap = new HashMap<>();
            courseMap.put(courseName, reports);
            result.add(courseMap);
        }

        return result;
    }
}

