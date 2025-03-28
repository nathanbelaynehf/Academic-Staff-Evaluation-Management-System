package com.example.asemsBack.Notification;


import com.example.asemsBack.Model.*;
import com.example.asemsBack.Repository.ReportRepo;
import com.example.asemsBack.Repository.SemesterRepo;
import com.example.asemsBack.Repository.TeacherCourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Component
public class TeacherNotificationScheduler {

    @Autowired
    private ReportRepo reportRepository;

    @Autowired
    private SemesterRepo semesterRepository;

    @Autowired
    private TeacherCourseRepo teacherCourseRepository;

    private List<String> teacherNotifications = new ArrayList<>();

    /**
     * Check for teacher notifications based on submission windows and results.
     */
    public void checkForTeacherNotifications() {
        System.out.println("Checking for teacher notifications...");

        // Clear previous notifications
        teacherNotifications.clear();

        // Fetch the active semester
        Semester activeSemester = semesterRepository.findByIsActive(true);
        if (activeSemester == null) {
            System.out.println("No active semester found.");
            return;
        }



        // Convert java.sql.Date to LocalDate
        LocalDate semesterStart = activeSemester.getStartDate().toLocalDate();
        LocalDate semesterEnd = activeSemester.getEndDate().toLocalDate();
        LocalDate now = LocalDate.now();

        Date currentDate = new Date();

        if (isEvaluationRoundEnd(currentDate, activeSemester)) {
            teacherNotifications.add("This round's evaluation is complete. Please check the results.");
            System.out.println("Evaluation round ended. Notification added.");
        }


        // Final submission window (2 weeks before end, lasts for 1 week)
        LocalDate finalSubmissionStart = semesterEnd.minusWeeks(2);
        LocalDate finalSubmissionEnd = finalSubmissionStart.plusWeeks(1);

        // Early submission windows (every 3 weeks)
        long weeksSinceStart = ChronoUnit.WEEKS.between(semesterStart, now);
        long windowNumber = weeksSinceStart / 3; // Every 3 weeks
        LocalDate windowStart = semesterStart.plusWeeks(windowNumber * 3);
        LocalDate windowEnd = windowStart.plusWeeks(1);

        // Check if today is within a submission window
        if ((now.isAfter(finalSubmissionStart) && now.isBefore(finalSubmissionEnd)) ||
                (now.isAfter(windowStart) && now.isBefore(windowEnd))) {
            sendReminderNotification("Submission window is open. Please submit your reports.");
        }

        // Check if today is one week after a submission window
        if (now.isAfter(finalSubmissionEnd.plusWeeks(1)) || now.isAfter(windowEnd.plusWeeks(1))) {
            sendResultNotification("Submission window closed one week ago. Please check the results.");
        }
    }

    /**
     * Send a reminder notification to teachers.
     */
    private void sendReminderNotification(String message) {
        System.out.println("Sending reminder notification: " + message);
        teacherNotifications.add(message);
    }

    /**
     * Send a result notification to teachers.
     */
    private void sendResultNotification(String message) {
        System.out.println("Sending result notification: " + message);
        teacherNotifications.add(message);
    }

    /**
     * Get the list of teacher notifications.
     */
    public List<String> getTeacherNotifications() {
        return teacherNotifications;
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
