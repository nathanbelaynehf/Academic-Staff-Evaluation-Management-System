package com.example.asemsBack.Notification;

import com.example.asemsBack.Model.*;
import com.example.asemsBack.Repository.AdEvalRepo;
import com.example.asemsBack.Repository.SemesterRepo;
import com.example.asemsBack.Repository.TeacherRepo;
import com.example.asemsBack.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ADNotificationScheduler {

    @Autowired
    UserRepo userRepo;

    @Autowired
    private AdEvalRepo academicDeanEvalRepository;

    @Autowired
    private TeacherRepo teacherRepository;

    @Autowired
    private SemesterRepo semesterRepository;

    private List<String> academicDeanNotifications = new ArrayList<>(); // Ensure this is mutable

    public synchronized void checkForAcademicDeanNotifications() {
        try {
            System.out.println("Checking for Academic Dean notifications...");

            // Clear previous notifications
            academicDeanNotifications.clear();

            // Get the current date
            Date currentDate = new Date();
            System.out.println("Current Date: " + currentDate);

            // Fetch the active semester
            Semester activeSemester = semesterRepository.findByIsActive(true);
            System.out.println("Active Semester: " + (activeSemester != null ? activeSemester.getSemesterName() : "None"));

            if (activeSemester != null) {
                // Check if today is the end of the 1st or 2nd evaluation round
                if (isEvaluationRoundEnd(currentDate, activeSemester)) {
                    academicDeanNotifications.add("This round's evaluation is complete. Please check the results.");
                    System.out.println("Evaluation round ended. Notification added.");
                }

                // Check if today is within the 1st or 2nd evaluation round
                if (isWithinEvaluationPeriod(currentDate, activeSemester)) {
                    System.out.println("Within evaluation period.");

                    // Fetch the logged-in Academic Dean's ID
                    Long academicDeanId = getLoggedInAcademicDeanId();
                    System.out.println("Logged-in Academic Dean ID: " + academicDeanId);

                    // Fetch all teachers
                    List<Teacher> allTeachers = teacherRepository.findAll();
                    System.out.println("All Teachers: " + allTeachers.size());

                    // Fetch the evaluations done by the Academic Dean
                    List<AcademicDeanEval> academicDeanEvaluations = academicDeanEvalRepository.findByAcademicDeanId(academicDeanId);
                    System.out.println("Academic Dean Evaluations: " + academicDeanEvaluations.size());

                    // Find unevaluated teachers
                    List<Teacher> unevaluatedTeachers = allTeachers.stream()
                            .filter(teacher -> academicDeanEvaluations.stream()
                                    .noneMatch(eval -> eval.getTeacher().equals(teacher)))
                            .collect(Collectors.toList());
                    System.out.println("Unevaluated Teachers: " + unevaluatedTeachers.size());

                    // Build the notification message for unevaluated teachers
                    if (!unevaluatedTeachers.isEmpty()) {
                        StringBuilder message = new StringBuilder("Reminder: You have not evaluated the following teachers:\n");
                        for (Teacher teacher : unevaluatedTeachers) {
                            message.append("- ").append(teacher.getUser().getUsername()).append("\n");
                        }
                        academicDeanNotifications.add(message.toString());
                        System.out.println("Unevaluated teachers notification added.");
                    }
                } else {
                    System.out.println("Not within evaluation period.");
                }
            } else {
                System.out.println("No active semester found.");
            }
        } catch (UnsupportedOperationException e) {
            System.err.println("UnsupportedOperationException: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private boolean isEvaluationRoundEnd(Date currentDate, Semester semester) {
        // Normalize currentDate to remove time component
        Calendar cal = Calendar.getInstance();
        cal.setTime(currentDate);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        Date normalizedCurrentDate = cal.getTime();

        // Normalize semester evaluation end dates
        Date end1 = semester.getEndof1stRoundEval();
        Date end2 = semester.getEndof2ndRoundEval();

        cal.setTime(end1);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        end1 = cal.getTime();

        cal.setTime(end2);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        end2 = cal.getTime();

        // Compare normalized dates
        return normalizedCurrentDate.equals(end1) || normalizedCurrentDate.equals(end2);
    }

    private boolean isWithinEvaluationPeriod(Date currentDate, Semester semester) {
        Calendar cal = Calendar.getInstance();

        // Create a calendar instance for currentDate
        cal.setTime(currentDate);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        Date normalizedCurrentDate = cal.getTime();

        // Normalize semester evaluation dates
        Date start1 = semester.getStartof1stRoundEval();
        Date end1 = semester.getEndof1stRoundEval();

        cal.setTime(start1);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        start1 = cal.getTime();

        cal.setTime(end1);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        end1 = cal.getTime();

        return (normalizedCurrentDate.after(start1) && normalizedCurrentDate.before(end1)) ||
                normalizedCurrentDate.equals(end1) ||
                (normalizedCurrentDate.after(semester.getStartof2ndRoundEval()) &&
                        normalizedCurrentDate.before(semester.getEndof2ndRoundEval())) ||
                normalizedCurrentDate.equals(semester.getEndof2ndRoundEval());
    }
    private Long getLoggedInAcademicDeanId() {
        AcademicDean academicDean = getAcademicDeanByUsername(getAuthenticatedUsername());
        return academicDean.getId(); // Replace with actual logic
    }

    public List<String> getAcademicDeanNotifications() {
        return academicDeanNotifications;
    }

    private String getAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }

        return ((UserDetails) authentication.getPrincipal()).getUsername();
    }

    public AcademicDean getAcademicDeanByUsername(String username) {
        Users user = userRepo.findByUsername(username);

        if (user != null && user.getAcademicDean() != null) {
            return user.getAcademicDean();  // Return the Academic Dean associated with the user
        }

        return null;  // Return null if no Academic Dean is found
    }
}