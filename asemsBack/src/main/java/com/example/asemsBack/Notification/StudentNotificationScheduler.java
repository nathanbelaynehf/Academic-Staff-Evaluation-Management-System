package com.example.asemsBack.Notification;

import com.example.asemsBack.Dto.StudEvalDTO;
import com.example.asemsBack.Model.*;
import com.example.asemsBack.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class StudentNotificationScheduler {

    @Autowired
    UserRepo userRepo;

    @Autowired
    private StudEvalRepository studEvalRepository;

    @Autowired
    private StudReportEvalRepo studReportEvalRepository;

    @Autowired
    private EnrollRepo enrollementRepository;

    @Autowired
    private SemesterRepo semesterRepository;

    private List<String> notifications = new ArrayList<>();

    public void checkForNotifications() {
        System.out.println("Checking for notifications...");

        // Clear previous notifications
        notifications.clear();

        // Get the current date
        Date currentDate = new Date();
        System.out.println("Current Date: " + currentDate);

        // Fetch the active semester
        Semester activeSemester = semesterRepository.findByIsActive(true);
        System.out.println("Active Semester: " + (activeSemester != null ? activeSemester.getSemesterName() : "None"));

        if (activeSemester != null) {
            // Check if today is within the 1st or 2nd evaluation round

            LocalDate semesterStart = activeSemester.getStartDate().toLocalDate();
            LocalDate semesterEnd = activeSemester.getEndDate().toLocalDate();
            LocalDate now = LocalDate.now();

            // Calculate the number of weeks in the semester
            long totalWeeks = ChronoUnit.WEEKS.between(semesterStart, semesterEnd);

            // Loop through every 3-week interval to check for submission windows
            for (long weeksSinceStart = 3; weeksSinceStart < totalWeeks; weeksSinceStart += 3) {
                // Submission window starts after `weeksSinceStart` weeks
                LocalDate submissionWindowStart = semesterStart.plusWeeks(weeksSinceStart);
                LocalDate submissionWindowEnd = submissionWindowStart.plusWeeks(1); // Submission window lasts 1 week

                // Evaluation starts immediately after the submission window ends and lasts 1 week
                LocalDate evaluationStart = submissionWindowEnd; // Evaluation starts on the same day the submission window ends
                LocalDate evaluationEnd = evaluationStart.plusWeeks(1); // Evaluation lasts 1 week

                // Check if today is within the evaluation period
                if (now.isAfter(evaluationStart) && now.isBefore(evaluationEnd)) {
                    sendEvaluationReminder("Evaluation of report has started please evaluate before " +evaluationEnd);
                }
            }
            if (isWithinEvaluationPeriod(currentDate, activeSemester)) {
                System.out.println("Within evaluation period.");

                // Fetch the logged-in student's ID
                Long studentId = getLoggedInStudentId();
                System.out.println("Logged-in Student ID: " + studentId);

                // Fetch the enrolled TeacherCourses for the student
                List<Enrollement> enrollments = enrollementRepository.findByStudentId(studentId);
                System.out.println("Enrollments: " + enrollments.size());

                List<TeacherCourse> enrolledCourses = enrollments.stream()
                        .map(Enrollement::getTeacherCourse)
                        .collect(Collectors.toList());
                System.out.println("Enrolled Courses: " + enrolledCourses.size());

                // Fetch the main evaluations for the student as DTOs
                List<StudEvalDTO> mainEvaluations = studEvalRepository.findByStudentId(studentId);
                System.out.println("Main Evaluations: " + mainEvaluations.size());

                // Find unevaluated main courses
                List<TeacherCourse> unevaluatedMainCourses = enrolledCourses.stream()
                        .filter(course -> mainEvaluations.stream()
                                .noneMatch(eval -> eval.getTacherCourseId() == course.getId())) // Compare teacher course IDs
                        .collect(Collectors.toList());
                System.out.println("Unevaluated Main Courses: " + unevaluatedMainCourses.size());

                // Build the notification for unevaluated main courses
                if (!unevaluatedMainCourses.isEmpty()) {
                    StringBuilder mainMessage = new StringBuilder("Reminder: You have not evaluated the following courses:\n");
                    for (TeacherCourse course : unevaluatedMainCourses) {
                        mainMessage.append("- ").append(course.getCourse().getCourseName()).append("\n");
                    }
                    notifications.add(mainMessage.toString());
                }

                if (notifications.isEmpty()) {
                    System.out.println("All evaluations completed.");
                } else {
                    System.out.println("Notifications: " + notifications);
                }
            } else {
                System.out.println("Not within evaluation period.");
            }
        } else {
            System.out.println("No active semester found.");
        }
    }
    private void sendEvaluationReminder(String message) {
        System.out.println("Sending evaluation reminder: " + message);
        notifications.add(message);
    }

    private boolean isWithinEvaluationPeriod(Date currentDate, Semester semester) {
        return (currentDate.after(semester.getStartof1stRoundEval()) && currentDate.before(semester.getEndof1stRoundEval())) ||
                (currentDate.after(semester.getStartof2ndRoundEval()) && currentDate.before(semester.getEndof2ndRoundEval()));
    }

    private Long getLoggedInStudentId() {
        Student student = getStudentByUsername(getAuthenticatedUsername());
        return student.getId(); // Replace with actual logic
    }

    public List<String> getNotifications() {
        return notifications;
    }

    private String getAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }

        return ((UserDetails) authentication.getPrincipal()).getUsername();
    }

    public Student getStudentByUsername(String username) {
        Users user = userRepo.findByUsername(username);

        if (user != null && user.getStudent() != null) {
            return user.getStudent();  // Return the Student associated with the user
        }

        return null;  // Return null if no student is found
    }
}