package com.example.asemsBack.Service;

import com.example.asemsBack.Dto.ReportDTO;
import com.example.asemsBack.Model.Report;
import com.example.asemsBack.Model.Semester;
import com.example.asemsBack.Model.TeacherCourse;
import com.example.asemsBack.Repository.ReportRepo;
import com.example.asemsBack.Repository.SemesterRepo;
import com.example.asemsBack.Repository.TeacherCourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReportService {
    @Autowired
    private ReportRepo reportRepository;

    @Autowired
    SemesterRepo semesterRepo;

    @Autowired
    private TeacherCourseRepo teacherCourseRepository;

    // Submit a report for a course
    public ResponseEntity<?> submitReport(Long teacherCourseId, List<Report> reports) {
        try {
            // Find the teacherCourse
            TeacherCourse teacherCourse = teacherCourseRepository.findById(teacherCourseId)
                    .orElseThrow(() -> new RuntimeException("TeacherCourse not found"));

            Semester activeSemester = semesterRepo.findByIsActive(true);
            if (activeSemester == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No active semester found.");
            }

            // Convert java.sql.Date to LocalDate
            LocalDate semesterStart = activeSemester.getStartDate().toLocalDate();
            LocalDate semesterEnd = activeSemester.getEndDate().toLocalDate();
            LocalDate now = LocalDate.now();

            // Final submission window (2 weeks before end, lasts for 1 week)
            LocalDate finalSubmissionStart = semesterEnd.minusWeeks(2);
            LocalDate finalSubmissionEnd = finalSubmissionStart.plusWeeks(1);

            if (now.isAfter(finalSubmissionStart) && now.isBefore(finalSubmissionEnd)) {
                for (Report report : reports) {
                    report.setSubmissionDate(LocalDateTime.now());
                    report.setTeacherCourse(teacherCourse);
                    reportRepository.save(report);
                }
                return ResponseEntity.status(HttpStatus.OK).body("Report submitted successfully during the final submission window.");
            }

            // Early submission windows (every 3 weeks)
            long weeksSinceStart = ChronoUnit.WEEKS.between(semesterStart, now);

            if (weeksSinceStart < 3) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Submissions are not allowed in the first 3 weeks.");
            }

            long windowNumber = weeksSinceStart / 3; // Every 3 weeks
            LocalDate windowStart = semesterStart.plusWeeks(windowNumber * 3);
            LocalDate windowEnd = windowStart.plusWeeks(1);

            if (now.isBefore(windowStart) || now.isAfter(windowEnd)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Submissions are only allowed during the submission window (one week every three weeks).");
            }

            // Save the reports
            for (Report report : reports) {
                report.setSubmissionDate(LocalDateTime.now());
                report.setTeacherCourse(teacherCourse);
                reportRepository.save(report);
            }

            return ResponseEntity.status(HttpStatus.OK).body("Reports submitted successfully");
        } catch (Exception e) {
            e.printStackTrace(); // Log error
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    public ResponseEntity<?> getReportsWithinLastWeek(Long teacherCourseId) {
        // Calculate the date 7 days ago
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusWeeks(1);

        // Fetch all reports for the teacherCourseId submitted within the last 7 days
        List<Report> reports = reportRepository.findByTeacherCourseIdAndSubmissionDateWithinLastWeek(teacherCourseId, oneWeekAgo);

        if (reports.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body("No reports found for the specified course within the last week.");
        }

        // Convert Report entities to ReportDTO objects
        List<ReportDTO> reportDTOs = reports.stream()
                .map(report -> {
                    ReportDTO dto = new ReportDTO();
                    dto.setId(report.getId());
                    dto.setTopicCovered(report.getTopicCovered());
                    dto.setStyleOfTeaching(report.getStyleOfTeaching());
                    dto.setSubmissionDate(report.getSubmissionDate());
                    return dto;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(reportDTOs);
    }


}
