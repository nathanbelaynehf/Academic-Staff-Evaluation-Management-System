package com.example.asemsBack.Notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/teacher")
@CrossOrigin(origins = "http://localhost:5173")
public class TeacherNotificationController {

    @Autowired
    TeacherNotificationScheduler teacherNotificationScheduler;

    @GetMapping("/notifications")
    public List<String> getTeacherNotifications() {
        // Manually trigger the teacher notification check
        teacherNotificationScheduler.checkForTeacherNotifications();
        // Fetch the teacher notification messages
        return teacherNotificationScheduler.getTeacherNotifications();
    }
}