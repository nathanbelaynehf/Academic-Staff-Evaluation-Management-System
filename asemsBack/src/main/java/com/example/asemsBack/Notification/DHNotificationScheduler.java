package com.example.asemsBack.Notification;


import com.example.asemsBack.Dto.DeptEvalDTO;
import com.example.asemsBack.Model.*;
import com.example.asemsBack.Repository.DeptEvalRepo;
import com.example.asemsBack.Repository.SemesterRepo;
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
public class DHNotificationScheduler {

    @Autowired
    UserRepo userRepo;

    @Autowired
    private DeptEvalRepo deptEvalRepository;

    @Autowired
    private SemesterRepo semesterRepository;

    private List<String> departmentHeadNotifications = new ArrayList<>();

    public void checkForDepartmentHeadNotifications() {
        System.out.println("Checking for Department Head notifications...");

        // Clear previous notifications
        departmentHeadNotifications.clear();

        // Get the current date
        Date currentDate = new Date();
        System.out.println("Current Date: " + currentDate);

        // Fetch the active semester
        Semester activeSemester = semesterRepository.findByIsActive(true);
        System.out.println("Active Semester: " + (activeSemester != null ? activeSemester.getSemesterName() : "None"));

        if (activeSemester != null) {
            // Check if today is within the 1st or 2nd evaluation round
            if (isEvaluationRoundEnd(currentDate, activeSemester)) {
                departmentHeadNotifications.add("This round's evaluation is complete. Please check the results.");
                System.out.println("Evaluation round ended. Notification added.");
            }

            if (isWithinEvaluationPeriod(currentDate, activeSemester)) {
                System.out.println("Within evaluation period.");

                // Fetch the logged-in Department Head's ID
                Long departmentHeadId = getLoggedInDepartmentHeadId();
                System.out.println("Logged-in Department Head ID: " + departmentHeadId);

                // Fetch the Department Head's department
                DepartmentHead departmentHead = getDepartmentHeadByUsername(getAuthenticatedUsername());
                Department department = departmentHead.getDepartment();
                System.out.println("Department: " + department.getDepartmentName());

                // Fetch all teachers in the department
                List<Teacher> departmentTeachers = department.getDepartmentTeachers().stream()
                        .map(DepartmentTeacher::getTeacher)
                        .collect(Collectors.toList());
                System.out.println("Department Teachers: " + departmentTeachers.size());

                // Fetch the evaluations done by the Department Head as DTOs
                List<DeptEvalDTO> departmentEvaluations = deptEvalRepository.findByDepartmentHeadId(departmentHeadId);
                System.out.println("Department Evaluations: " + departmentEvaluations.size());

                // Find unevaluated teachers
                List<Teacher> unevaluatedTeachers = departmentTeachers.stream()
                        .filter(teacher -> departmentEvaluations.stream()
                                .noneMatch(eval -> eval.getTeacherId() == teacher.getId()))
                        .collect(Collectors.toList());
                System.out.println("Unevaluated Teachers: " + unevaluatedTeachers.size());

                // Build the notification message for unevaluated teachers
                if (!unevaluatedTeachers.isEmpty()) {
                    StringBuilder message = new StringBuilder("Reminder: You have not evaluated the following teachers:\n");
                    for (Teacher teacher : unevaluatedTeachers) {
                        message.append("- ").append(teacher.getUser().getUsername());
                    }
                    departmentHeadNotifications.add(message.toString());
                    System.out.println("Unevaluated teachers notification added.");
                }
            } else {
                System.out.println("Not within evaluation period.");
            }
        } else {
            System.out.println("No active semester found.");
        }
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

    private Long getLoggedInDepartmentHeadId() {
        DepartmentHead departmentHead = getDepartmentHeadByUsername(getAuthenticatedUsername());
        return departmentHead.getId(); // Replace with actual logic
    }

    public List<String> getDepartmentHeadNotifications() {
        return departmentHeadNotifications;
    }

    private String getAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }

        return ((UserDetails) authentication.getPrincipal()).getUsername();
    }

    public DepartmentHead getDepartmentHeadByUsername(String username) {
        Users user = userRepo.findByUsername(username);

        if (user != null && user.getDepartmentHead() != null) {
            return user.getDepartmentHead();  // Return the Department Head associated with the user
        }

        return null;  // Return null if no Department Head is found
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

}
